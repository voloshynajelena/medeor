import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../_shared/shared.module';
import { ClientListComponent } from './client-list.component';
import { ClientTableComponent } from './client-table/client-table.component';
import { ModalDeleteAllTagsComponent } from './modal-delete-all-tags/modal-delete-all-tags.component';
import { NewClientComponent } from './new-client/new-client.component';
import { RemoveClientModalComponent } from './remove-client-modal/remove-client-modal.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    ClientTableComponent,
    ClientListComponent,
    ModalDeleteAllTagsComponent,
    NewClientComponent,
    RemoveClientModalComponent,
    TagsComponent,
  ],
  imports: [CommonModule, SharedModule, BrowserAnimationsModule],
  exports: [ClientListComponent],
})
export class ClientListModule {}
