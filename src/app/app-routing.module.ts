import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ClientListComponent } from './modules/client-list/client-list.component';
import { ClientProfileComponent } from './modules/client-profile/client-profile.component';
import { TestProfileComponent } from './modules/client-profile/test-profile/test-profile.component';
import { ConstructorTestComponent } from './modules/constructor-test/constructor-test.component';
import { MainComponent } from './modules/layout/main/main.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';

// в переменную routes добавляем все новые компоненты, которым нужен свой адрес
// т.о. компонента откроется по указанному адресу
// пустые кавычки - корневой адрес

// при использовании роутинга, если наша компонента должна содержать в адресе ID
// мы обозначаем ее имя и пишем с двоеточием
// Например :clientId

export const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'constructor',
    component: ConstructorTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: ':userId', component: ClientListComponent, canActivate: [AuthGuard] },
  {
    path: 'client/:clientId',
    component: ClientProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test-profile/:testid',
    component: TestProfileComponent,
    canActivate: [AuthGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
