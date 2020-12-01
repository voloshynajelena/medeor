import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

// в переменную routes добавляем все новые компоненты, которым нужен свой адрес
// т.о. компонента откроется по указанному адресу
// пустые кавычки - корневой адрес

 // при использовании роутинга, если наша компонента должна содержать в адресе ID
 // мы обозначаем ее имя и пишем с двоеточием
 // Например :clientId

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: ':userId', component: ProfileComponent },
    { path: 'client/:clientId', component: ClientComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
