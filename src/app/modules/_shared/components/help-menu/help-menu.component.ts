import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { WIKI_URL } from 'src/app/constants';
import { ContactUsModalComponent } from 'src/app/modules/_shared/components/contact-us-modal/contact-us-modal.component';
import { User } from 'src/app/types';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpMenuComponent {
  public wikiUrl: string = WIKI_URL;

  @Input() user: User;

  constructor(private dialog: MatDialog) {}

  public contactUsModalOpen(): void {
    this.dialog.open(ContactUsModalComponent, { data: this.user });
  }
}
