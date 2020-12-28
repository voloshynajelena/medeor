import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';
import {ClientService} from '../../services/client.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalDeleteAllTagsComponent } from '../modal-delete-all-tags/modal-delete-all-tags.component';

// enum all tags array
enum AllTagsEnum {
  diabetic = 'Diabetic',
  allergic = 'Allergic',
  multPregnancy = 'Multiple pregnancy',
  secondPregnancy = 'Second pregnancy',
  tenWeeksPregnancy = '10 weeks pregnancy',
  vegetarian = 'Vegetarian',
  covid = 'Covid',
  exCovid = 'ex Covid',
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.less']
})

export class TagsComponent implements OnInit {
  @Input() tags: string[];
  @Input() client: string;

  visible = true;
  selectable = true;

  // disable tags remove option by default
  removable = false;
  // class active for edit mode is false by default
  isActive = false;

  // warning block of duplicate tag is hidden by default
  isSameTag = false;

  // block no tags to delete is false by default
  isNoTagsToDelete = false;

  // if no tags added
  isNoTags = false;

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
  @ViewChild('tagsBlock') tagsBlock: ElementRef;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    if (!this.tags.length) {
      this.isNoTags = true;
    } else {
      this.isNoTags = false;
      this.tagCtrl.setValidators([this.duplicateTagsValidator]);

    }
  }

  // enable tags edit mode
  inputEnable(): void {
    // input enable
    this.tagCtrl.enable();

    // add style class active
    this.isActive = true;

    // hide no-tags block
    this.isNoTags = false;

    // enable tags remove option
    this.removable = true;

    // hide no tags to delete
    this.isNoTagsToDelete = false;
  }

  // disable tags edit mode
  inputDisable(): void {
    // input disable
    this.tagCtrl.disable();

    // remove style class active
    this.isActive = false;

    // disable tags remove option
    this.removable = false;

    // show no-tags block if tags array is empty after edition
    if (!this.tags.length) {
      this.isNoTags = true;
    } else {
      this.isNoTags = false;
    }

    // hide no tags to delete
    this.isNoTagsToDelete = false;
  }

  // remove all tags
  deleteAllTags(): void {
    this.tags = [];

    // send data to server
    this.clientService.updatePatient({
      id: this.client,
      tags: this.tags,
    }).subscribe();

    // remove style class active
    this.isActive = false;

    // show no-tags block
    this.isNoTags = true;
  }

  // modal window - are you to delete all tags?
  openDialogRemoveAllTags(): void {
    const dialogRef = this.dialog.open(ModalDeleteAllTagsComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (this.tags.length && result) {
        this.deleteAllTags();
      } else if (!this.tags.length && result) {
        // show if no tags to delete
        this.isNoTagsToDelete = true;
      }
    });
  }

  // click outside of the tags block
  onClickedOutside(event: Event): void {

    // disable tags edit mode by click outside of the block
    this.inputDisable();

    // hide no tags to delete by click outside of the block
    this.isNoTagsToDelete = false;
  }


  constructor(
    private clientService: ClientService,
    public dialog: MatDialog,
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  // adding new tag by clicking to button
  addTagBut(): void {
    const newTag = this.tagInput.nativeElement.value;

    // Add our tag
    if ((newTag || '').trim()) {

      // add new tag
      this.tags.push(newTag.trim());

      // let indexNewTag = this.tags.indexOf(newTag);

      // check if a new tag doesn't exist in the array
      // if(indexNewTag === -1) {

        // add new tag
       // this.tags.push(newTag.trim());

      // } else {
      //     this.isSameTag = true;

      //     setTimeout(function(){
      //       this.isSameTag = false;
      //       console.log('setTimeout works in 2 sec!!!!!!!!!!!!!!');
      //     }, 2000);
      // }

      // send data to server
      this.clientService.updatePatient({
        id: this.client,
        tags: this.tags,
      }).subscribe();
    }

    // Reset the input value
    if (this.tagInput) {
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

        // add new tag
        this.tags.push(value.trim());

      } else {
        this.isSameTag = true;
      }

      // send data to server
      this.clientService.updatePatient({
        id: this.client,
        tags: this.tags,
      }).subscribe();
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

      // add new tag from select
      this.tags.push(event.option.value);
    } else {
      this.isSameTag = true;
    }

    // send data to server
    this.clientService.updatePatient({
      id: this.client,
      tags: this.tags,
    }).subscribe();

    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  // remove tags from tags array
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);

      // send data to server
      this.clientService.updatePatient({
        id: this.client,
        tags: this.tags,
      }).subscribe();
    }
  }

  // tags duplication validator
  duplicateTagsValidator(control: FormControl): ValidationErrors {
    console.log('-----', this.tags);
    const newTag = control.value; // new tag

    if (this.tags && this.tags?.indexOf(newTag) >= 0) {
      return { duplicatedNewTag: 'This tag has been already added to the list' };
    }
    return null;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
