import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {first} from 'rxjs/operators';
import {Client, Response} from '../../types';

@Component({
  selector: 'app-new-test-group',
  templateUrl: './new-test-group.component.html',
  styleUrls: ['./new-test-group.component.less']
})
export class NewTestGroupComponent implements OnInit {
  errorValidation = '';
  errorHttp = '';
  message = '';
  newTestGroupForm: FormGroup;
  loading = false;
  submitted = false;
  newTest: Client;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<NewTestGroupComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {user: {userId: string, token: string}},
  ) { }

  ngOnInit(): void {
    this.newTestGroupForm = this.formBuilder.group({
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
  get f(): any { return this.newTestGroupForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newTestGroupForm.invalid) {
      this.errorValidation = 'Ошибка при заполнении формы';
      for (const controlName in this.newTestGroupForm.controls) {
        if (this.newTestGroupForm.controls.hasOwnProperty(controlName)){
          const errorMessage = this.getErrorMessage(this.newTestGroupForm.get(controlName) as FormControl);
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
    this.clientService.createClient(this.newTestGroupForm.value)
      .pipe(first())
      .subscribe(
        (data: Client | Response) => {
          if ((data as Response).error) {
            this.errorHttp = (data as Response).error;
          } else {
            this.newTest = data as Client;
            this.message = `Patient ${(data as Client).name} ${(data as Client).surname} created`;
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
  closeOverlay(): void {
    this.dialogRef.close();
  }
}
