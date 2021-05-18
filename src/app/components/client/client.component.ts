import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ClientService } from 'src/app/services/client.service';
import { getAge } from '../../utils/date';
import { RemovePatientModalComponent } from 'src/app/components/remove-patient-modal/remove-patient-modal.component';
import { TESTS } from 'src/app/components/clients-table/clients-table.component';
import { FF_AVATAR, Gender } from 'src/app/constants';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {

  private urlExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  private clientId: string;

  public client: Client;
  public userAvatar: string;
  public tests = TESTS;

  public editMode = false;
  public sending = false;

  public clientForm = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    sex: new FormControl(''),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)]),
    photo: new FormControl(''),
    pregnancy: new FormControl('')
  });

  clientChipTags: string[] = [];
  public gender: typeof Gender = Gender;
  public isAvatarFeatureEnabled = FF_AVATAR;
  getAge = getAge;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
) { }

  ngOnInit(): void {
    this.route.params.subscribe(({clientId}) => {
      this.clientId = clientId;
    });

    this.clientService.getClientData(this.clientId).subscribe(
      (data: any) => {
        this.client = data;
        this.userAvatar = data.photo;
        this.resetFormData();
      }
    );
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

  setAvatar(url: string): void {
    if (url.match(this.urlExp)) {
      const img = new Image();

      img.addEventListener('error', event => this.client.photo = '');
      img.addEventListener('load', event => this.client.photo = url);

      img.src = url;
    } else {
      this.client.photo = '';
    }
  }

  resetFormData(): void {
    this.client.photo = this.userAvatar;

<<<<<<< HEAD
    this.clientForm = new FormGroup({
      surname: new FormControl(this.client.surname, [Validators.required]),
      name: new FormControl(this.client.name, [Validators.required]),
      sex: new FormControl(this.client.sex),
      birthday: new FormControl(this.client.birthday, [Validators.required]),
      email: new FormControl(this.client.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.client.phone, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(6)]),
      photo: new FormControl(this.client.photo),
      pregnancy: new FormControl(this.client.pregnancy)
    });
=======
    for (const key in this.client) {
      if ( this.clientForm.controls.hasOwnProperty(key) ) {
        this.clientForm.controls[key].setValue(this.client[key]);
      }
    }
>>>>>>> 5e0d6e8f800a5251756333f7968f6af6c97dfd17
  }

  submit(): void {
    this.sending = true;

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const controls = this.clientForm.controls;

    const formData = JSON.parse(JSON.stringify(this.client));

    for (const key in controls) {
      if ( controls.hasOwnProperty(key) ) {
        formData[key] = controls[key].value;
      }
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
