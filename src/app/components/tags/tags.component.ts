import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
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
import { AllTagsEnum } from '../../constants';
import { ClientService } from '../../services/client.service';
import { ModalDeleteAllTagsComponent } from '../modal-delete-all-tags/modal-delete-all-tags.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
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

  visible = true;
  selectable = true;

  // disable tags remove option by default
  removable = false;

  // class active for edit mode is false by default
  isActive = false;

  // notification block of duplicate tag is hidden by default
  isSameTag = false;

  // block no tags to delete is false by default
  isNoTagsToDelete = false;

  //option to hide 'no tags block' is false by default
  isNoAddedTagsHide = false;

  //show edit (pencil) button and hide check mark button by default
  editBtnDisplay = true;

  filteredTags: Observable<string[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');

  // all tags array - for select list
  allTags: AllTagsEnum[] = [
    AllTagsEnum.diabetic,
    AllTagsEnum.allergic,
    AllTagsEnum.multPregnancy,
    AllTagsEnum.secondPregnancy,
    AllTagsEnum.tenWeeksPregnancy,
    AllTagsEnum.vegetarian,
    AllTagsEnum.covid,
    AllTagsEnum.exCovid,
  ];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  // enable tags edit mode
  inputEnable(): void {
    // input enable
    this.tagCtrl.enable();

    // add style class active
    this.isActive = true;

    // enable tags remove option
    this.removable = true;

    // hide no tags to delete
    this.isNoTagsToDelete = false;

    //hide 'no tags block' in active mode
    this.isNoAddedTagsHide = true;

    //hide edit (pencil) button and show check mark button
    this.editBtnDisplay = false;
  }

  // disable tags edit mode (save tags)
  saveTags(): void {
    // send data to server
    this.clientService
      .updateClient({
        id: this.client,
        tags: this.tags,
      })
      .subscribe();

    // input disable
    this.tagCtrl.disable();

    // remove style class active
    this.isActive = false;

    // disable tags remove option
    this.removable = false;

    // hide no tags to delete
    this.isNoTagsToDelete = false;

    // hide duplicate tag block
    this.isSameTag = false;

    //show edit (pencil) button and hide check mark button
    this.editBtnDisplay = true;

    //show 'no tags block' if no tags added
    if (!this.tags.length) {
      this.isNoAddedTagsHide = false;
    }
  }

  // remove all tags
  deleteAllTags(): void {
    this.tags = [];

    // send data to server
    this.clientService
      .updateClient({
        id: this.client,
        tags: this.tags,
      })
      .subscribe();

    // remove style class active
    this.isActive = false;

    //show edit (pencil) button and hide check mark button
    this.editBtnDisplay = true;

    //show 'no tags block'
    if (!this.tags.length) {
      this.isNoAddedTagsHide = false;
    }
  }

  // adding new tag by clicking to button
  addTagBut(): void {
    const newTag = this.tagInput.nativeElement.value;

    // Add our tag
    if ((newTag || '').trim()) {
      const indexNewTag = this.tags.indexOf(newTag);

      // check if a new tag doesn't exist in the array
      if (indexNewTag === -1) {
        this.isSameTag = false;

        // add new tag
        this.tags.push(newTag.trim());
      } else {
        this.isSameTag = true;
      }
    }

    // Reset the input value
    if (this.tagInput.nativeElement) {
      this.tagInput.nativeElement.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  // adding new tag by clicking on enter or comma
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      const indexNewTag = this.tags.indexOf(value);

      // check if a new tag doesn't exist in the array
      if (indexNewTag === -1) {
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
  selected(event: MatAutocompleteSelectedEvent): void {
    const indexNewTag = this.tags.indexOf(event.option.value);

    // check if a new tag doesn't exist in the array
    if (indexNewTag === -1) {
      this.isSameTag = false;

      // add new tag from select
      this.tags.push(event.option.value);
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

  // tags duplication validator
  duplicateTagsValidator(control: FormControl): ValidationErrors {
    const newTag = control.value; // new tag

    if (this.tags && this.tags?.indexOf(newTag) >= 0) {
      return {
        duplicatedNewTag: 'This tag has been already added to the list',
      };
    }
    return null;
  }

  // modal window - are you sure to delete all tags?
  openDialogRemoveAllTags(): void {
    const dialogRef = this.dialog.open(ModalDeleteAllTagsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (this.tags.length && result) {
        this.deleteAllTags();
      } else if (!this.tags.length && result) {
        // show block no tags to delete
        this.isNoTagsToDelete = true;
        // hide block no tags to delete after 1 sec
        setTimeout(() => {
          this.isNoTagsToDelete = false;
        }, 1000);
      }
    });
  }

  //tooltips for edit buttons
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
