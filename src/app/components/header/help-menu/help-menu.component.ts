import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ContactUsModalComponent } from 'src/app/components/contact-us-modal/contact-us-modal.component';
import { User } from 'src/app/types';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.less']
})
export class HelpMenuComponent implements OnInit {

  @Input() user: User;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  contactUsModalOpen() {
    this.dialog.open(ContactUsModalComponent, {data: this.user});
  }

}
