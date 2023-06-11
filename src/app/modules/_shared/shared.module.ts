import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { AppRoutingModule } from '../../app-routing.module';

import { MaterialModule } from '../_material/material.module';
import { ContactUsModalComponent } from './components/contact-us-modal/contact-us-modal.component';
import { DateNowComponent } from './components/date-now/date-now.component';
import { HelpMenuComponent } from './components/help-menu/help-menu.component';
import { TestListWidgetComponent } from './components/test-list-widget/test-list-widget.component';
import { UserIconDialogComponent } from './components/user-icon-dialog/user-icon-dialog.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { TestsFilterPipe } from './pipes/tests-filter.pipe';

@NgModule({
  declarations: [
    TestListWidgetComponent,
    ContactUsModalComponent,
    DateNowComponent,
    HelpMenuComponent,
    UserIconComponent,
    UserMenuComponent,
    UserIconDialogComponent,
    TestsFilterPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxMatIntlTelInputComponent,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    TestListWidgetComponent,
    ContactUsModalComponent,
    DateNowComponent,
    HelpMenuComponent,
    UserIconComponent,
    UserMenuComponent,
    NgxMatIntlTelInputComponent,

    TestsFilterPipe,
  ],
})
export class SharedModule {}
