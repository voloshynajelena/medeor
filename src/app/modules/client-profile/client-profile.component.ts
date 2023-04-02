import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { FF_AVATAR, Gender } from '../../constants';
import { ClientService } from '../../services/client.service';
import { TestsService } from '../../services/tests.service';
import { Client, Test, User } from '../../types';
import { getAge } from '../../utils/date';
import { RemoveClientModalComponent } from '../client-list/remove-client-modal/remove-client-modal.component';
import { UserIconDialogComponent } from '../_shared/components/user-icon-dialog/user-icon-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit, OnDestroy {
  public sending = false;
  public editMode = false;
  public userAvatar: string;
  public clientChipTags: string[] = [];
  public client: Client;
  public user: User;
  public gender: typeof Gender = Gender;
  public isAvatarFeatureEnabled = FF_AVATAR;
  public clientForm = new FormGroup({
    surname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    sex: new FormControl(''),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    photo: new FormControl(''),
    pregnancy: new FormControl(''),
  });
  private tests: BehaviorSubject<Test[]> = new BehaviorSubject<Test[]>([]);
  readonly tests$: Observable<Test[]> = this.tests.asObservable();
  private clientId: string;
  getAge = getAge;

  private subs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private testService: TestsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService
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

    // updating user data after edit
    this.subs = this.userService.user$.subscribe((data: User) => {
      this.user = data;
    });
  }

  public enableEditMode(): void {
    this.editMode = true;
    this.clientForm.markAllAsTouched();
    this.clientForm.updateValueAndValidity();
    console.log(this.clientForm.controls['phone']);

  }

  public disableEditMode(): void {
    this.editMode = false;
    this.resetFormData();
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
        Validators.required]),
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

  openDialog() {
    this.dialog.open(UserIconDialogComponent, {
      data: this.client
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
