import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-remove-patient-modal',
  templateUrl: './remove-patient-modal.component.html',
  styleUrls: ['./remove-patient-modal.component.less']
})
export class RemovePatientModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) { }

}
