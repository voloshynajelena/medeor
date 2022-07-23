import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/types';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIconComponent {
  @Input() userData: User;
  public hideImage = false;
}
