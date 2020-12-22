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
import { FormUserProfileComponent } from './components/form-user-profile/form-user-profile.component';

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
    FormUserProfileComponent,
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
