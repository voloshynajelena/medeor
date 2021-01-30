import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {first} from 'rxjs/operators';
import {Client, ITest, Response} from '../../../types';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.less']
})
export class NewTestComponent implements OnInit {

  errorValidation = '';
  errorHttp = '';
  message = '';
  newTestGroupForm: FormGroup;
  loading = false;
  submitted = false;
  newTest: ITest;
  constructor(
    private formBuilder: FormBuilder,
    private testService: TestsService,
    private dialogRef: MatDialogRef<NewTestComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {user: {userId: string, token: string}},
  ) { }

  ngOnInit(): void {
    this.newTestGroupForm = this.formBuilder.group({
      code: ['', Validators.required],
      refValue: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
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
    this.testService.createTestTemplates(this.newTestGroupForm.value)
      .pipe(first())
      .subscribe(
        (data: ITest | Response) => {
          if ((data as Response).error) {
            this.errorHttp = (data as Response).error;
          } else {
            this.newTest = data as ITest;
            this.message = `Test ${(data as ITest).title} created`;
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
