import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';

// Helpers
import { initialState, metaReducers, reducers } from './state/reducers';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ClientComponent } from './components/client/client.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { DateNowComponent } from './components/header/date-now/date-now.component';
import { LastTestsWidgetComponent } from './components/last-tests-widget/last-tests-widget.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
import { HelpMenuComponent } from './components/header/help-menu/help-menu.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { ContactUsModalComponent } from './components/contact-us-modal/contact-us-modal.component';
import { ConstructorTestsComponent } from './components/constructor-tests/constructor-tests.component';
import { GroupedTestsTableComponent } from './components/grouped-tests-table/grouped-tests-table.component';
import { NewTestGroupComponent } from './components/new-test-group/new-test-group.component';
import { TestsTableComponent } from './components/tests-table/tests-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ClientComponent,
    ClientsTableComponent,
    UserSettingsComponent,
    UserMenuComponent,
    DateNowComponent,
    LastTestsWidgetComponent,
    NewPatientComponent,
    HelpMenuComponent,
    UserIconComponent,
    ContactUsModalComponent,
    ConstructorTestsComponent,
    GroupedTestsTableComponent,
    NewTestGroupComponent,
    TestsTableComponent,
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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
