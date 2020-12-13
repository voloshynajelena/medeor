import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-now',
  template: `
    <button class="date-now" mat-flat-button disabled>{{ date | date: 'd MMMM YYYY, EEEE | HH:mm:ss'}}</button>
  `,
  styles: [
    '.date-now { color: rgba(0,0,0,.5) !important; margin-right: 16px; }'
  ]
})
export class DateNowComponent implements OnInit {

  date = new Date();

  constructor() {}

  ngOnInit(): void {
    setInterval(() => this.date = new Date(), 1000)
  }

}
