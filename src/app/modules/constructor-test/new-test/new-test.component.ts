import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TestsService } from '../../../services/tests.service';
import { TestTemplatesInterface } from './test-templates.interface';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTestComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public titleTabIndex = new FormControl(0);
  public testsList: any[];

  public codeCtrl = new FormControl('', Validators.required);
  public titleCtrl = new FormControl('', Validators.required);
  public descriptionCtrl = new FormControl('');
  public unitCtrl = new FormControl('');
  public refValueCtrl = new FormGroup({
    min: new FormControl(''),
    max: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user: { userId: string; token: string } },
    private testsService: TestsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public submit(): void {
    // TODO: fix this implementation
    this.titleCtrl.markAllAsTouched();
    this.codeCtrl.markAsTouched();
    this.descriptionCtrl.markAsTouched();

    if (this.titleCtrl.invalid) {
      this.titleTabIndex.setValue(0);
    }

    if (this.titleCtrl.valid && this.codeCtrl.valid) {
      const data = this.getFormData();

      this.loading = true;

      this.testsService.createTestTemplates(data).subscribe(
        (resp) => {
          this.loading = false;
          this.submitted = true;

          this.titleCtrl.reset();
          this.codeCtrl.reset();
          this.descriptionCtrl.reset();
          this.unitCtrl.reset();
          this.refValueCtrl.reset();

          if (resp?.data?.length) {
            this.testsList = resp.data;
          }
        },
        (error) => {
          this.loading = false;
          this.snackBar.open(
            'Error. Data was not saved! Description: ' + error,
            'Hide'
          );
        }
      );
    }
  }

  public closeAfterSubmitModal(): void {
    this.submitted = false;
  }

  private getFormData(): TestTemplatesInterface {
    return {
      code: this.codeCtrl.value,
      title: this.titleCtrl.value,
      description: this.descriptionCtrl.value,
      unit: this.unitCtrl.value,
      // @ts-ignore
      refValue: this.getCtrlValues(this.refValueCtrl.controls),
    };
  }

  private getCtrlValues(controls: {}): {} {
    const result = {};

    Object.keys(controls).forEach((key) => {
      result[key] = controls[key].value;
    });

    return result;
  }
}
