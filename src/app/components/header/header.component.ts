import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/types';
import { UserService } from '../../services/user.service';
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
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user?.userId) {
      this.userService.getUserData(this.user.userId).subscribe(
        (data: User) => {
          this.data = data;
        }
      );
    }
  }
}
