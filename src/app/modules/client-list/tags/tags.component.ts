import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';

import { AllTagsEnum } from '../../../constants';
import { ClientService } from '../../../services/client.service';
import { ModalDeleteAllTagsComponent } from '../modal-delete-all-tags/modal-delete-all-tags.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  public selectable = true;
  public removable = false; // disable tags remove option by default
  public isActive = false; // class active for edit mode is false by default
  public isSameTag = false; // notification block of duplicate tag is hidden by default
  public isNoTagsToDelete = false; // block no tags to delete is false by default
  public isNoAddedTagsHide = false; // option to hide 'no tags block' is false by default
  public editBtnDisplay = true; // show edit (pencil) button and hide check mark button by default
  public filteredTags: Observable<string[]>;
  public tagCtrl = new FormControl('');
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  private allTags: AllTagsEnum[] = [
    // all tags array - for select list
    AllTagsEnum.diabetic,
    AllTagsEnum.allergic,
    AllTagsEnum.multPregnancy,
    AllTagsEnum.secondPregnancy,
    AllTagsEnum.tenWeeksPregnancy,
    AllTagsEnum.vegetarian,
    AllTagsEnum.covid,
    AllTagsEnum.exCovid,
  ];

  // tooltips for edit buttons
  private positionOptions: TooltipPosition[] = [
    'below',
    'above',
    'left',
    'right',
  ];
  public position = new FormControl(this.positionOptions[1]);

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input() tags: string[];
  @Input() client: string;

  constructor(private clientService: ClientService, public dialog: MatDialog) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

  // enable tags edit mode
  public inputEnable(): void {
    this.tagCtrl.enable(); // input enable
    this.isActive = true; // add style class active
    this.removable = true; // enable tags remove option
    this.isNoTagsToDelete = false; // hide no tags to delete
    this.isNoAddedTagsHide = true; // hide 'no tags block' in active mode
    this.editBtnDisplay = false; // hide edit (pencil) button and show check mark button
  }

  // disable tags edit mode (save tags)
  public saveTags(): void {
    // send data to server
    this.clientService
      .updateClient({
        id: this.client,
        tags: this.tags,
      })
      .subscribe();

    this.tagCtrl.disable(); // input disable
    this.isActive = false; // remove style class active
    this.removable = false; // disable tags remove option
    this.isNoTagsToDelete = false; // hide no tags to delete
    this.isSameTag = false; // hide duplicate tag block
    this.editBtnDisplay = true; // show edit (pencil) button and hide check mark button

    if (!this.tags.length) {
      // show 'no tags block' if no tags added
      this.isNoAddedTagsHide = false;
    }
  }

  // adding new tag by clicking to button
  public addTagBut(): void {
    const newTag = this.tagInput.nativeElement.value;

    // Add our tag
    if ((newTag || '').trim()) {
      const indexNewTag = this.tags.indexOf(newTag);

      // check if a new tag doesn't exist in the array
      if (indexNewTag === -1) {
        this.isSameTag = false;
        this.tags.push(newTag.trim()); // add new tag
      } else {
        this.isSameTag = true;
      }
    }

    if (this.tagInput.nativeElement) {
      this.tagInput.nativeElement.value = ''; // Reset the input value
    }

    this.tagCtrl.setValue(null);
  }

  // adding new tag by clicking on enter or comma
  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      const indexNewTag = this.tags.indexOf(value);

      if (indexNewTag === -1) {
        // check if a new tag doesn't exist in the array
        this.isSameTag = false;

        // add new tag
        this.tags.push(value.trim());
      } else {
        this.isSameTag = true;
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.tagCtrl.setValue(null);
  }

  // adding our tag from select list
  public selected(event: MatAutocompleteSelectedEvent): void {
    const indexNewTag = this.tags.indexOf(event.option.value);

    if (indexNewTag === -1) {
      // check if a new tag doesn't exist in the array
      this.isSameTag = false;
      this.tags.push(event.option.value); // add new tag from select
    } else {
      this.isSameTag = true;
    }

    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  // remove tags from tags array
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  // modal window - are you sure to delete all tags?
  public openDialogRemoveAllTags(): void {
    const dialogRef = this.dialog.open(ModalDeleteAllTagsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tags.length && result) {
        this.deleteAllTags();
      } else if (!this.tags.length && result) {
        this.isNoTagsToDelete = true; // show block no tags to delete
        setTimeout(() => {
          // hide block no tags to delete after 1 sec
          this.isNoTagsToDelete = false;
        }, 1000);
      }
    });
  }

  // remove all tags
  private deleteAllTags(): void {
    this.tags = [];

    // send data to server
    this.clientService
      .updateClient({
        id: this.client,
        tags: this.tags,
      })
      .subscribe();

    this.isActive = false; // remove style class active
    this.editBtnDisplay = true; // show edit (pencil) button and hide check mark button

    // show 'no tags block'
    if (!this.tags.length) {
      this.isNoAddedTagsHide = false;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // TODO: tags duplication validator
  // duplicateTagsValidator(control: FormControl): ValidationErrors {
  //   const newTag = control.value; // new tag
  //
  //   if (this.tags && this.tags?.indexOf(newTag) >= 0) {
  //     return {
  //       duplicatedNewTag: 'This tag has been already added to the list',
  //     };
  //   }
  //   return null;
  // }
}
