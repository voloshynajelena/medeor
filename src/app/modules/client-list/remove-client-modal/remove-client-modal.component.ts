import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Client } from 'src/app/types';

@Component({
  selector: 'app-remove-client-modal',
  templateUrl: './remove-client-modal.component.html',
  styleUrls: ['./remove-client-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveClientModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) {}
}
