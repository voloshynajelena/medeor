import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../_shared/shared.module';
import { ClientListModule } from '../client-list/client-list.module';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [MainComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule, ClientListModule],
  exports: [MainComponent, SidebarComponent, HeaderComponent],
})
export class LayoutModule {}
