import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-date-now',
  templateUrl: './date-now.component.html',
  styleUrls: ['./date-now.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateNowComponent {
  public date: Observable<Date> = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );
}
