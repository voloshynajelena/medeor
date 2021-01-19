import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from 'src/app/services/client.service';
import { RemovePatientModalComponent } from 'src/app/components/remove-patient-modal/remove-patient-modal.component';
import { TESTS } from 'src/app/components/clients-table/clients-table.component';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {

  private urlExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  clientId: string;
  client: Client;
  userAvatar: string;
  tests = TESTS;

  editMode = false;
  sending = false;

  clientForm: FormGroup;
  clientChipTags: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
) { }

  ngOnInit(): void {
    // достаем ID клиента из адресной строки и записываем в созданную выше переменную
    this.route.params.subscribe(({clientId}) => {
      this.clientId = clientId;
    });

    // используем ID клиента для получения данных клиента
    // поскольку данные нужно ждать - подписываемся на сервис и когда данные прийдут - запишем их
    this.clientService.getClientData(this.clientId).subscribe(
      (data: any) => {
        this.client = data;
        this.userAvatar = data.photo;
        this.resetFormData();
      }
    );
  }

  getAge(dob: string): number {
    const dobDate = new Date(dob).getFullYear();
    const nowDate = new Date().getFullYear();

    return nowDate - dobDate;
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if (value) {
      this.clientChipTags.push(value);
    }

    input.value = '';
  }

  removeTag(tagName: string): void {
    const tags = this.clientChipTags;
    const index = tags.indexOf(tagName);

    if (index !== -1) {
      tags.splice(index, 1);
    }
  }

  enableEditMode(): void {
    this.editMode = true;
    this.clientForm.markAllAsTouched();
    this.clientForm.updateValueAndValidity();
  }
  
  disableEditMode(): void {
    this.editMode = false;
    this.resetFormData();
  }

  setAvatar(url: string) {
    if (url.match(this.urlExp)) {
      const img = new Image();

      img.addEventListener('error', event => this.client.photo = '');
      img.addEventListener('load', event => this.client.photo = url);

      img.src = url;
    } else this.client.photo = '';
  }

  resetFormData(): void {
    this.client.photo = this.userAvatar;

    this.clientForm = new FormGroup({
      photo: new FormControl(this.client.photo),
      surname: new FormControl(this.client.surname, [Validators.required]),
      name: new FormControl(this.client.name, [Validators.required]),
      sex: new FormControl(this.client.sex),
      birthday: new FormControl(this.client.birthday, [Validators.required]),
      email: new FormControl(this.client.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.client.phone, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(12)]),
      pregnancy: new FormControl(this.client.pregnancy)
    });

    this.clientChipTags = this.client.tags.map(t => t);
  }

  submit(): void {
    this.sending = true;

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const controls = this.clientForm.controls;

    const formData = JSON.parse(JSON.stringify(this.client));

    for (const key in controls) {
      formData[key] = controls[key].value;
    }

    formData.photo = this.userAvatar = this.client.photo;

    this.clientService.updatePatient({
      userId: user.userId,
      token: user.token,
      ...formData,
      tags: this.clientChipTags.map(t => t)
    }).subscribe(data => {
      this.sending = false;

      for (const key in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, key)) {
          this.client[key] = controls[key].value;
        }
      }

      this.client.tags = this.clientChipTags.map(t => t);

      this.disableEditMode();
    }, error => {
      this.sending = false;
      this._snackBar.open('Error. Data was not saved!', 'Hide');
    });
  }

  acceptToRemove(): void {
    const dialogRef = this.dialog.open(RemovePatientModalComponent, {data: this.client});

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientService.deleteClient(this.clientId).subscribe(resp => {
          this.client = null;
          this.router.navigateByUrl('/');
        });
      }
    });
  }
}
