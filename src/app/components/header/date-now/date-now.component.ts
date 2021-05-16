import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {startWith} from 'rxjs/internal/operators/startWith';

@Component({
  selector: 'app-date-now',
  templateUrl: './date-now.component.html',
  styleUrls: ['./date-now.component.less']
})
export class DateNowComponent implements OnInit {

  public date: Observable<Date> = interval(1000).pipe( startWith(0), map(() => new Date()) );

  constructor() {}

  ngOnInit(): void {}

}
