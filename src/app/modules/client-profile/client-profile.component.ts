import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FF_AVATAR, Gender } from '../../constants';
import { ClientService } from '../../services/client.service';
import { TestsService } from '../../services/tests.service';
import { Client, Test } from '../../types';
import { getAge } from '../../utils/date';
import { RemoveClientModalComponent } from '../client-list/remove-client-modal/remove-client-modal.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit {
  public sending = false;
  public editMode = false;
  public userAvatar: string;
  public clientChipTags: string[] = [];
  public client: Client;
  public gender: typeof Gender = Gender;
  public isAvatarFeatureEnabled = FF_AVATAR;
  public clientForm = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    sex: new FormControl(''),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(6),
    ]),
    photo: new FormControl(''),
    pregnancy: new FormControl(''),
  });
  private tests: BehaviorSubject<Test[]> = new BehaviorSubject<Test[]>([]);
  readonly tests$: Observable<Test[]> = this.tests.asObservable();
  // private urlExp =
  //   /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  private clientId: string;
  getAge = getAge;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private testService: TestsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ clientId }) => {
      this.clientId = clientId;
    });

    this.clientService.getClientData(this.clientId).subscribe((data: any) => {
      this.client = data;
      this.userAvatar = data.photo;
      this.resetFormData();
    });

    this.testService.getTestsTemplates().subscribe(({ data }) => {
      this.tests.next(data);
    });
  }

  public enableEditMode(): void {
    this.editMode = true;
    this.clientForm.markAllAsTouched();
    this.clientForm.updateValueAndValidity();
  }

  public disableEditMode(): void {
    this.editMode = false;
    this.resetFormData();
  }

  // public setAvatar(url: string): void {
  //   if (url.match(this.urlExp)) {
  //     const img = new Image();

  //     img.addEventListener('error', (event) => (this.client.photo = ''));
  //     img.addEventListener('load', (event) => (this.client.photo = url));

  //     img.src = url;
  //   } else {
  //     this.client.photo = '';
  //   }
  // }
  avatarChangeEvent(fileInput: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = rs => {
        this.client.photo = e.target.result;
      }
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }
  removeAvatar() {
    this.client.photo = ''
    this.clientForm.controls.photo.reset()
  }
  public goBack(): void {
    history.back();
  }

  private resetFormData(): void {
    this.client.photo = this.userAvatar;

    this.clientForm = new FormGroup({
      surname: new FormControl(this.client.surname, [Validators.required]),
      name: new FormControl(this.client.name, [Validators.required]),
      sex: new FormControl(this.client.sex),
      birthday: new FormControl(this.client.birthday, [Validators.required]),
      email: new FormControl(this.client.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.client.phone, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(6),
      ]),
      photo: new FormControl(this.client.photo),
      pregnancy: new FormControl(this.client.pregnancy),
    });

    for (const key in this.client) {
      if (this.clientForm.controls.hasOwnProperty(key)) {
        this.clientForm.controls[key].setValue(this.client[key]);
      }
    }
  }

  public submit(): void {
    this.sending = true;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const controls = this.clientForm.controls;
    const formData = JSON.parse(JSON.stringify(this.client));

    for (const key in controls) {
      if (controls.hasOwnProperty(key)) {
        formData[key] = controls[key].value;
      }
    }

    formData.photo = this.userAvatar = this.client.photo;

    this.clientService
      .updateClient({
        userId: user.userId,
        token: user.token,
        ...formData,
        tags: this.clientChipTags.map((t) => t),
      })
      .subscribe(
        () => {
          this.sending = false;

          for (const key in controls) {
            if (Object.prototype.hasOwnProperty.call(controls, key)) {
              this.client[key] = controls[key].value;
            }
          }

          this.client.tags = this.clientChipTags.map((t) => t);
          this.disableEditMode();
        },
        (error) => {
          this.sending = false;
          this.snackBar.open(
            'Error. Data was not saved! Description: ' + error,
            'Hide'
          );
        }
      );
  }

  public acceptToRemove(): void {
    const dialogRef = this.dialog.open(RemoveClientModalComponent, {
      data: this.client,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientService.deleteClient(this.clientId).subscribe((resp) => {
          this.client = null;
          this.router.navigateByUrl('/');
        });
      }
    });
  }
}
