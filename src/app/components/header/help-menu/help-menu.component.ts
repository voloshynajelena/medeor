import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ContactUsModalComponent } from 'src/app/components/contact-us-modal/contact-us-modal.component';
import { WIKI_URL } from 'src/app/constants';
import { User } from 'src/app/types';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.scss'],
})
export class HelpMenuComponent {
  public wikiUrl: string = WIKI_URL;

  @Input() user: User;

  constructor(private dialog: MatDialog) {}

  public contactUsModalOpen(): void {
    this.dialog.open(ContactUsModalComponent, { data: this.user });
  }
}
