import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ConstructorTestComponent } from './constructor-test.component';
import { GroupedTestsTableComponent } from './grouped-tests-table/grouped-tests-table.component';
import { NewTestGroupComponent } from './new-test-group/new-test-group.component';
import { NewTestComponent } from './new-test/new-test.component';
import { TestsTableComponent } from './tests-table/tests-table.component';

@NgModule({
  declarations: [
    ConstructorTestComponent,
    GroupedTestsTableComponent,
    NewTestComponent,
    NewTestGroupComponent,
    TestsTableComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ConstructorTestModule {}
