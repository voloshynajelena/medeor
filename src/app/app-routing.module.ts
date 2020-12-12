import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

import { AuthGuard } from './_helpers';

// в переменную routes добавляем все новые компоненты, которым нужен свой адрес
// т.о. компонента откроется по указанному адресу
// пустые кавычки - корневой адрес

 // при использовании роутинга, если наша компонента должна содержать в адресе ID
 // мы обозначаем ее имя и пишем с двоеточием
 // Например :clientId

export const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-settings', component: UserSettingsComponent },
    { path: ':userId', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'client/:clientId', component: ClientComponent, canActivate: [AuthGuard] },
     // otherwise redirect to home
     { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
