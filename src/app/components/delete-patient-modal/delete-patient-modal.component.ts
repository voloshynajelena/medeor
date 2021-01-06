import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-delete-patient-modal',
  templateUrl: './delete-patient-modal.component.html',
  styleUrls: ['./delete-patient-modal.component.less']
})
export class DeletePatientModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) { }

  ngOnInit(): void {
  }

}
