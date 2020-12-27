import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-now',
  templateUrl: './date-now.component.html',
  styleUrls: ['./date-now.component.less']
})
export class DateNowComponent implements OnInit {

  date = new Date();

  constructor() {}

  ngOnInit(): void {
    setInterval(() => this.date = new Date(), 1000);
  }

}
