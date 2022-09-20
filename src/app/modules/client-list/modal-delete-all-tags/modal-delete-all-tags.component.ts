import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modal-delete-all-tags',
  templateUrl: './modal-delete-all-tags.component.html',
  styleUrls: ['./modal-delete-all-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDeleteAllTagsComponent {}
