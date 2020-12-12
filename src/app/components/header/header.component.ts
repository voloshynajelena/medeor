import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { currentUserData } from 'src/app/state/selectors/user.selectors';
import { User } from 'src/app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  data: User;
  user;
  userData$: Observable<User>;
  @Output() menu: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private dataService: DataService,
    private store: Store<State>,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {}

    ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('currentUser'));

      // используем ID пользователя для получения данных пользователя
      // поскольку данные нужно ждать - подписываемся на сервис и когда данные прийдут - запишем их
    if(this.user?.userId) {
      this.dataService.getUserData(this.user.userId).subscribe(
        (data: User) => {
          this.data = data;
          console.log('getUserData---', data);
        }
      );
      }
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
