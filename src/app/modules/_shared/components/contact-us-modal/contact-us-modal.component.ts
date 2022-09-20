import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/types';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsModalComponent implements OnInit {
  @ViewChild('userNameInput') inputName: ElementRef;
  @ViewChild('userEmailInput') inputEmail: ElementRef;
  @ViewChild('userMessageInput') inputMessage: ElementRef;

  public submited = false;
  public pending = false;
  public userName: string;
  public userEmail: string;
  public message: string;

  public contactUs: FormGroup = new FormGroup({
    userName: new FormControl(this.data.name, Validators.required),
    userEmail: new FormControl(this.data.email, [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl('', Validators.required),
  });

  constructor(
    public dialog: MatDialog,
    public http: HttpService,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {}

  public submit(): void {
    this.pending = false;
    this.submited = true;
    const user = {
      userName: this.contactUs.get('userName').value,
      userEmail: this.contactUs.get('userEmail').value,
      message: this.contactUs.get('message').value,
    };

    this.http.sendMessage('http://localhost:3002/sendMail', user).subscribe(
      (data) => {
        // TODO: complete sendMessage logic
        const res: any = data;
        console.log(
          `My name is ${user.userName}. My email is ${user.userEmail}. My message is ${user.message}`
        );
      },

      (err) => {
        console.log(err);
        this.notification.throwError(err);
        this.pending = false;
      },
      () => {
        this.pending = false;
      }
    );
  }
}
