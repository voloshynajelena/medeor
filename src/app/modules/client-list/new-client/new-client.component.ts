import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { ClientService } from '../../../services/client.service';
import { Client, Response } from '../../../types';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewClientComponent implements OnInit {
  public errorValidation = '';
  public errorHttp = '';
  public message = '';
  public newClientForm: FormGroup;
  public loading = false;
  public submitted = false;
  public maxDate = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<NewClientComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: { userId: string; token: string } }
  ) {}

  ngOnInit(): void {
    this.newClientForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      sex: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      pregnancy: [''],
      photo: [''],
      analyzes: [[]],
    });
  }
  get f(): any {
    return this.newClientForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.newClientForm.invalid) {
      this.errorValidation = 'Form is invalid';
      for (const controlName in this.newClientForm.controls) {
        if (this.newClientForm.controls.hasOwnProperty(controlName)) {
          const errorMessage = this.getErrorMessage(
            this.newClientForm.get(controlName) as FormControl
          );
          if (errorMessage) {
            this.errorValidation = errorMessage;
          }
        }
      }
      return;
    }
    this.errorValidation = '';
    this.errorHttp = '';
    this.message = '';
    this.loading = true;
    this.clientService
      .createClient(this.newClientForm.value)
      .pipe(first())
      .subscribe(
        (data: Client | Response) => {
          if ((data as Response).error) {
            this.errorHttp = (data as Response).error;
          } else {
            this.message = `Client ${(data as Client).name} ${
              (data as Client).surname
            } created`;
            this.closeOverlay(data);
          }
          this.loading = false;
        },
        (error) => {
          this.errorHttp = error;
          this.loading = false;
        }
      );
  }

  public getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    } else if (control.hasError('validatePhoneNumber')) {
      return 'Please enter valid phone namber';
    }
    return control.hasError('email') ? 'Not a valid email' : '';
  }

  public closeOverlay(dialogResult?): void {
    this.dialogRef.close(dialogResult);
  }
}
