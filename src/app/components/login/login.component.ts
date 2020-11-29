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
  constructor(
    private accountService: AccountService,
    private router: Router
    ) {}

  validateLogin() {
    if(this.username && this.password) {
      this.accountService.getUserId(this.username, this.password)
      .subscribe((data: {userId}) => {
        console.log(data);
        this.router.navigate([`${data.userId}`]);
      }, error => {
        console.log('error is ', error);
      });
      } else {

        alert('enter user name and password');
      }
  }

}
