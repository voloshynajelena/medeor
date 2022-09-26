import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/types';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  // TODO: specify type
  public data;
  private user;

  @Output() menu: EventEmitter<null> = new EventEmitter<null>();

  private subs: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user?.userId) {
      this.userService.getUserData(this.user.userId).subscribe((data: User) => {
        if (data?.id) {
          this.data = data;
        }
      });
    }
    // updating user data after edit
    this.subs = this.userService.user$.subscribe((data: User) => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
