import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';
import {ClientService} from '../../services/client.service';

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
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();

  filteredTags: Observable<string[]>;

  // current tags array
  defaultTags: string[] = ['Diabetic', 'Allergic', 'Multiple pregnancy'];

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

  constructor(
    private clientService: ClientService,
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    // if (!this.tags.length) {
    //   this.tags = this.defaultTags;
    // }
  }

  add(event: MatChipInputEvent): void {
    console.log('add---', event);

    const input = event.input;
    const value = event.value;
    console.log('add---', input);
    console.log('add---', value);

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
      this.clientService.updatePatient({
        id: this.client,
        tags: this.tags,
      }).subscribe();
      console.log('add this.tags---', this.tags);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    console.log('remove---', tag);
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected---', event);
    this.tags.push(event.option.value);
    this.clientService.updatePatient({
      id: this.client,
      tags: this.tags,
    }).subscribe();
    console.log('selected---', this.tags);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}
