import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { ClientProfileComponent } from './client-profile.component';
import { ClientTestsTableComponent } from './client-tests-table/client-tests-table.component';
import { TestProfileComponent } from './test-profile/test-profile.component';

@NgModule({
  declarations: [
    ClientProfileComponent,
    ClientTestsTableComponent,
    TestProfileComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ClientProfileModule {}
