import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  username = '';
  password = '';
  hide = true;
  constructor(
    private accountService: AccountService,
    private router: Router
    ) {}

  validateLogin() {
    if(this.username && this.password) {
      // получаем из ngModel переменки и делаем запрос за ID если данные введены правильно
      this.accountService.getUserId(this.username, this.password)
      .subscribe((data: {userId}) => {
        console.log(data);
        // навигируем на страницу профиля юзера, используя его ID
        this.router.navigate([`${data.userId}`]);
      }, error => {
        console.log('error is ', error);
      });
      } else {
        alert('enter user name and password');
      }
  }

}
