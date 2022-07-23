import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { dateFormat } from 'src/app/constants';
import { Test } from 'src/app/types';

@Component({
  selector: 'app-test-list-widget',
  templateUrl: './test-list-widget.component.html',
  styleUrls: ['./test-list-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListWidgetComponent {
  dateFormat: string = dateFormat;
  @Input() test: Test;
}
