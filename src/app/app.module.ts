import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ClientTestsTableComponent } from './components/client-tests-table/client-tests-table.component';
import { ClientComponent } from './components/client/client.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ConstructorTestsComponent } from './components/constructor-tests/constructor-tests.component';
import { GroupedTestsTableComponent } from './components/constructor-tests/grouped-tests-table/grouped-tests-table.component';
import { NewTestGroupComponent } from './components/constructor-tests/new-test-group/new-test-group.component';
import { NewTestComponent } from './components/constructor-tests/new-test/new-test.component';
import { TestsTableComponent } from './components/constructor-tests/tests-table/tests-table.component';
import { ContactUsModalComponent } from './components/contact-us-modal/contact-us-modal.component';
import { DateNowComponent } from './components/header/date-now/date-now.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpMenuComponent } from './components/header/help-menu/help-menu.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { LastTestsWidgetComponent } from './components/last-tests-widget/last-tests-widget.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ModalDeleteAllTagsComponent } from './components/modal-delete-all-tags/modal-delete-all-tags.component';
import { NewClientComponent } from './components/new-client/new-client.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RemoveClientModalComponent } from './components/remove-client-modal/remove-client-modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TagsComponent } from './components/tags/tags.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MaterialModule } from './modules/material/material.module';
import { TestsFilterPipe } from './pipes/tests-filter.pipe';
import { initialState, metaReducers, reducers } from './state/reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

    MainComponent,
    HeaderComponent,
    SidebarComponent,
    HelpMenuComponent,

    ProfileComponent,
    UserSettingsComponent,
    UserMenuComponent,
    UserIconComponent,

    ClientComponent,
    ClientsTableComponent,
    ClientTestsTableComponent,
    NewClientComponent,
    RemoveClientModalComponent,

    LastTestsWidgetComponent,
    TestsTableComponent,
    TestsFilterPipe,
    NewTestComponent,
    NewTestGroupComponent,
    ConstructorTestsComponent,
    GroupedTestsTableComponent,

    TagsComponent,
    ModalDeleteAllTagsComponent,

    ContactUsModalComponent,
    ChangePasswordComponent,
    DateNowComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers, initialState }),
    MatPaginatorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
