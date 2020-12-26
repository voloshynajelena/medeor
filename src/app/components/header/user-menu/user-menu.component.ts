import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

import { User } from 'src/app/types';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent {

  @Input() user: User;

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
