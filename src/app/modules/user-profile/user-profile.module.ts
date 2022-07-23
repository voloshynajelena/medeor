import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [UserProfileComponent, ChangePasswordComponent],
  imports: [CommonModule, SharedModule],
})
export class UserProfileModule {}
