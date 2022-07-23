import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TestsService } from '../../../services/tests.service';
import {
  TestGroupTemplatesInterface,
  Translation,
} from './test-templates.interface';

@Component({
  selector: 'app-new-test-group',
  templateUrl: './new-test-group.component.html',
  styleUrls: ['./new-test-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTestGroupComponent {
  public loading = false;
  public submitted = false;
  public titleTabIndex = new FormControl(0);
  public testsList: any[];
  public testsCtrl = new FormControl('', Validators.required);

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

  // public unitCtrl = new FormGroup({
  //   ru: new FormControl(''),
  //   ua: new FormControl(''),
  //   en: new FormControl('')
  // });

  // public refValueCtrl = new FormGroup({
  //   min: new FormControl(''),
  //   max: new FormControl('')
  // });

  constructor(
    public dialogRef: MatDialogRef<NewTestGroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { user: { userId: string; token: string } },
    private testsService: TestsService,
    private snackBar: MatSnackBar
  ) {}

  public submit(): void {
    this.titleCtrl.markAllAsTouched();
    this.testsCtrl.markAsTouched();

    if (this.titleCtrl.invalid) {
      this.titleTabIndex.setValue(0);
    }

    if (this.titleCtrl.valid && this.testsCtrl.valid) {
      const data = this.getFormData();
      this.loading = true;

      this.testsService.createTestGroupTemplate(data).subscribe(
        (resp) => {
          this.loading = false;
          this.submitted = true;

          this.titleCtrl.reset();
          this.testsCtrl.reset();
          this.descriptionCtrl.reset();

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

  private getFormData(): TestGroupTemplatesInterface {
    return {
      tests: this.testsCtrl?.value
        ?.split?.(',')
        .map?.((code: string) => ({ typeId: code.trim() })),
      name: this.getCtrlValues(this.titleCtrl.controls) as Translation,
      description: this.getCtrlValues(
        this.descriptionCtrl.controls
      ) as Translation,
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
