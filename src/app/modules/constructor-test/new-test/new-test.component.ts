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
import {
  TestTemplatesInterface,
  Translation,
} from './test-templates.interface';

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

  public titleCtrl = new FormGroup({
    ru: new FormControl('', Validators.required),
    ua: new FormControl(''),
    en: new FormControl(''),
  });

  public descriptionCtrl = new FormGroup({
    ru: new FormControl(''),
    ua: new FormControl(''),
    en: new FormControl(''),
  });

  public unitCtrl = new FormGroup({
    ru: new FormControl(''),
    ua: new FormControl(''),
    en: new FormControl(''),
  });

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
    this.titleCtrl.markAllAsTouched();
    this.codeCtrl.markAsTouched();

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
      title: this.getCtrlValues(this.titleCtrl.controls) as Translation,
      description: this.getCtrlValues(
        this.descriptionCtrl.controls
      ) as Translation,
      unit: this.getCtrlValues(this.unitCtrl.controls) as Translation,
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
