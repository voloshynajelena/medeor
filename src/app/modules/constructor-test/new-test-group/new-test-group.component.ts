import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TestsService } from '../../../services/tests.service';
import { TestGroupTemplatesInterface } from './test-templates.interface';

@Component({
  selector: 'app-new-test-group',
  templateUrl: './new-test-group.component.html',
  styleUrls: ['./new-test-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTestGroupComponent {
  public loading = false;
  public submitted = false;
  public testsList: any[];

  public testsCtrl = new FormControl('', Validators.required);
  public titleCtrl = new FormControl('');
  public descriptionCtrl = new FormControl('');

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
    this.descriptionCtrl.markAsTouched();

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
    console.log(this.descriptionCtrl.value);
    return {
      tests: this.testsCtrl?.value
        ?.split?.(',')
        .map?.((code: string) => ({ typeId: code.trim() })),
      name: this.titleCtrl.value,
      description: this.descriptionCtrl.value,
    };
  }
}
