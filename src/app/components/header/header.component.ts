import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/types';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  data: User;
  user;
  @Output() menu: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private dataService: DataService,
    private router: Router,
    private authenticationService: AuthenticationService,
    ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user?.userId) {
      this.dataService.getUserData(this.user.userId).subscribe(
        (data: User) => {
          this.data = data;
        }
      );
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
