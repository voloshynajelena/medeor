import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsModalComponent implements OnInit {

  @ViewChild('userNameInput') inputName: ElementRef;
  @ViewChild('userEmailInput') inputEmail: ElementRef;
  @ViewChild('userMessageInput') inputMessage: ElementRef;

  submited = false;
  pending = false;

  userName: string;
  userEmail: string;
  message: string;

  contactUs : FormGroup = new FormGroup({
    userName: new FormControl(this.data.name, Validators.required),
    userEmail: new FormControl(this.data.email, [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl('', Validators.required)
  });

  constructor(
    public dialog: MatDialog,
    public http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.pending = false;
    this.submited = true;
    let user = {
      userName: this.inputName.nativeElement.value,
      userEmail: this.inputEmail.nativeElement.value,
      message: this.inputMessage.nativeElement.value,
    }

    this.http.sendMessage("http://localhost:3002/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(
          `My name is ${user.userName}. My email is ${user.userEmail}. My message is ${user.message}`
        );
      },

      err => {
        console.log(err);
        this.pending = false;

      }, () => {
        this.pending = false;

      }

    );


  }
}
