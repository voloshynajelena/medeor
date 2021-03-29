import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TESTS } from '../clients-table/clients-table.component';
import {PageEvent} from '@angular/material/paginator';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-patient-tests-table',
  templateUrl: './patient-tests-table.component.html',
  styleUrls: ['./patient-tests-table.component.less']
})
export class PatientTestsTableComponent implements OnInit {
  //patients tests array
  tests = TESTS;
  
  //checkboxes
  allComplete: boolean = false;
  mainCheckboxDisabled: boolean = false;
  allMarkedTests: number = 0;

  //tests sorted descending true by default
  sortedDescending: boolean = true;

  //btn 'Print checked' is disabled if false
  testsChecked: boolean = false;

  //for pagination
  numberPatientTests = this.tests.length;
  defaultTestsPerPage: any = 5;
  filteredTests: any[] = [];
  pageSizeOptions = [5, 10, 25, 100, this.numberPatientTests];
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent;

  //for tests filter
  foundTests: any[] = [];
  search = '';
  testsNotFound: boolean = false;

  // tooltip
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  constructor() { }

  ngOnInit(): void {
    //descending sorting by date on init
    this.tests.sort((a, b) => {
      let dateA: any = new Date(a.date);
      let dateB: any = new Date(b.date);

      return dateB - dateA;
    });
    this.sortedDescending = true;

    //pagination - tests per page on init
    this.filteredTests = this.tests.slice(0, this.defaultTestsPerPage);

    //main checkbox disabled if no tests added
    if(!this.tests.length) {
      this.mainCheckboxDisabled = true;
    } else {
      this.mainCheckboxDisabled = false;
    }
  }

  // fuction on key up while typing search
  // checkboxes behavior
  // block 'no tests found'
  searchKeyUpFunction(){
    this.search.trim();

    this.foundTests = this.tests.filter(
      test => test.name.toLowerCase().includes(this.search.toLowerCase())
    );
    
    //if no search
    if (!this.search.trim()) {
      this.testsNotFound = false;
      this.mainCheckboxDisabled = false;

      // main checkbox behavior if no search (for ex. query was deleted)
      let allTestsMarked = this.filteredTests.every(t => t.marked);
      if(allTestsMarked){
        this.allComplete = true;
      } else {
        this.allComplete = false;
      }
      return;
    }

    //'no tests found'
    if(this.foundTests.length) {
      this.testsNotFound = false;
      this.mainCheckboxDisabled = false;
    }
    if(!this.foundTests.length) {
      this.testsNotFound = true;
      this.mainCheckboxDisabled = true;
    }

    //main checkbox behavior if search
    let allFoundTestsMarked = this.foundTests.every(t => t.marked);
    if (allFoundTestsMarked) {
      this.allComplete = true;
    } else {
      this.allComplete = false;
    }
  }

  //pagination
  onPaginateChange(data: PageEvent) {

    //tests per page when user changes options to view
    this.filteredTests = this.tests.slice(data.pageIndex*data.pageSize, data.pageIndex*data.pageSize + data.pageSize);
    this.allComplete = false;

    //if all tests marked
    let allTestsMarked = this.filteredTests.every(t => t.marked);
    if (allTestsMarked) {
      //remain main checkbox cheked
      this.allComplete = true;
    }

    //count number of checked tests
    this.allMarkedTests = this.tests.filter(t => t.marked).length;
  }

  //paginator - show all tests
  showAllTests() {
    this.filteredTests = this.tests;
    this.defaultTestsPerPage = this.numberPatientTests;
  }

  //drag & drop items
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filteredTests, event.previousIndex, event.currentIndex);
  }

  //check-uncheck main checkbox by marking all checkboxes
  updateAllComplete() {
    //if search is not applied
    if (!this.search.trim()) {
      this.allComplete = this.filteredTests != null && this.filteredTests.every(t => t.marked);

      //btn 'Print checked' - disabled and active
      let markedTests = this.filteredTests.filter(t => t.marked).length;
      if(markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    //if search is applied
    if(this.search.trim()) {
      //tests found in search
      this.foundTests = this.tests.filter(
        test => test.name.toLowerCase().includes(this.search.toLowerCase())
      );

      this.allComplete = this.foundTests != null && this.foundTests.every(t => t.marked);

      //btn 'Print checked' - disabled and active
      let markedTests = this.foundTests.filter(t => t.marked).length;
      if(markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    //count number of checked tests
    this.allMarkedTests = this.tests.filter(t => t.marked).length;
  }
  
  //main checkbox behavior if some checkboxes marked - changes to "-"
  someComplete(): boolean {
    if (this.tests == null) {
      return false;
    }

    //if search is not applied
    if (!this.search.trim()) {
      return this.filteredTests.filter(t => t.marked).length > 0 && !this.allComplete;
    }

    //if search is applied
    if(this.search.trim()) {
      //tests found in search
      this.foundTests = this.tests.filter(
        test => test.name.toLowerCase().includes(this.search.toLowerCase())
      );
      
      return this.foundTests.filter(t => t.marked).length > 0 && !this.allComplete;
    }
  }

  //check-uncheck all checkboxes by marking main checkbox
  setAll(marked: boolean) {
    if (this.tests == null) {
      return;
    }

    //if search is not applied
    if (!this.search.trim()) {
      this.filteredTests.forEach(t => t.marked = marked);
      this.allComplete = marked;

      //btn 'Print checked' - disabled and active
      let markedTests = this.filteredTests.filter(t => t.marked).length;
      if(markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    //if search is applied
    if(this.search.trim()) {
      //tests found in search
      this.foundTests = this.tests.filter(
        test => test.name.toLowerCase().includes(this.search.toLowerCase())
      );

      this.foundTests.forEach(t => t.marked = marked);
      this.allComplete = marked;

      //btn 'Print checked' - disabled and active
      let markedTests = this.foundTests.filter(t => t.marked).length;
      if(markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    //count number of checked tests
    this.allMarkedTests = this.tests.filter(t => t.marked).length;
  }

  //uncheck all tests
  uncheckAllTests() {
    //make all tests unmarked
    this.tests.forEach(t => t.marked = false);

    //making main checkbox unmarked
    this.allComplete = false;

    //count number of checked tests
    this.allMarkedTests = this.tests.filter(t => t.marked).length;

    //making "Print checked" button disabled
    this.testsChecked = false;
  }

  //sorting by date
  sortByDate() {

    if (this.sortedDescending) {

      //ascenging sorting
      this.tests.sort((a, b) => {
        let dateA: any = new Date(a.date);
        let dateB: any = new Date(b.date);

        return dateA - dateB;
      });
      this.sortedDescending = false;
      
    } else if (!this.sortedDescending) {
    
      //descending sorting
      this.tests.sort((a, b) => {
        let dateA: any = new Date(a.date);
        let dateB: any = new Date(b.date);

        return dateB - dateA;
      });
      this.sortedDescending = true;
    }
  }

  //print current test
  printCurrentTest(test) {
    //print current test to console
    console.log('print current test ---->', test);
  }

  //print all tests
  printAllTests() {
    if (this.tests == null) {
      return;
    }
    //print all tests to console
    console.log('all tests to print------>', this.tests);
  }

  //print checked tests
  printCheckedTests() {
    //choose checked tests
    let markedTests = this.tests.filter(t => t.marked);
    //print checked tests to console
    console.log('marked tests to print------>', markedTests);
  }
}
