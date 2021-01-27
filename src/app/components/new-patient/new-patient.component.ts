import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Client, Response} from '../../types';
import {Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.less']
})
export class NewPatientComponent implements OnInit {
  errorValidation = '';
  errorHttp = '';
  message = '';
  newPatientForm: FormGroup;
  loading = false;
  submitted = false;
  newClient: Client;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<NewPatientComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {user: {userId: string, token: string}},
  ) { }

  ngOnInit(): void {
    this.newPatientForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      sex: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: [''],
      pregnancy: [''],
      photo: [''],
      analyzes: [[]],
    });
  }
  get f(): any { return this.newPatientForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.newPatientForm.invalid) {
      this.errorValidation = 'Ошибка при заполнении формы';
      for (const controlName in this.newPatientForm.controls) {
        if (this.newPatientForm.controls.hasOwnProperty(controlName)){
          const errorMessage = this.getErrorMessage(this.newPatientForm.get(controlName) as FormControl);
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
    this.clientService.createClient(this.newPatientForm.value)
      .pipe(first())
      .subscribe(
        (data: Client | Response) => {
          if ((data as Response).error) {
            this.errorHttp = (data as Response).error;
          } else {
            this.newClient = data as Client;
            this.message = `Patient ${(data as Client).name} ${(data as Client).surname} created`;
            this.closeOverlay(data);
          }
          this.loading = false;
        },
        error => {
          this.errorHttp = error;
          this.loading = false;
        });
  }
  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    return control.hasError('email') ? 'Not a valid email' : '';
  }
  closeOverlay(dialogResult?): void {
    this.dialogRef.close(dialogResult);
  }
}
