import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  submited = false;
  pending = false;

  userName: string;
  userEmail: string;

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
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.pending = true;
// TODO: create mailService
    setTimeout(() => {
      this.userName = this.inputName.nativeElement.value;
      this.userEmail = this.inputEmail.nativeElement.value;

      this.pending = false;
      this.submited = true;
    }, 2000);
  }

}
