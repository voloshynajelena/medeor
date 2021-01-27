import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { dateFormat } from 'src/app/constants';
import { Test } from 'src/app/types';

@Component({
  selector: 'app-last-tests-widget',
  templateUrl: './last-tests-widget.component.html',
  styleUrls: ['./last-tests-widget.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastTestsWidgetComponent {
  dateFormat: string = dateFormat;
  @Input() test: Test;
}
