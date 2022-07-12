import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/types';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.less'],
})
export class UserIconComponent implements OnInit {
  @Input('userData') data: User;
  hideImage = false;

  constructor() {}

  ngOnInit(): void {}
}
