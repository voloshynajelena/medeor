import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';

// pdf
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TESTS } from '../clients-table/clients-table.component';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// iterface for sorting
interface ISortData {
  pageIndex: number;
  pageSize: number;
}
@Component({
  selector: 'app-client-tests-table',
  templateUrl: './client-tests-table.component.html',
  styleUrls: ['./client-tests-table.component.scss'],
})
export class ClientTestsTableComponent implements OnInit {
  // clients tests array
  tests = TESTS;

  // checkboxes
  allComplete = false;
  mainCheckboxDisabled = false;
  allMarkedTests = 0;

  // tests sorted descending true by default
  sortedDescending = true;

  // btn 'Print checked' is disabled if false
  testsChecked = false;

  // for pagination
  numberClientTests: number = this.tests.length;
  defaultTestsPerPage = 5;
  filteredTests: any[] = [];
  pageSizeOptions = [5, 10, 25, 100, this.tests.length];
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent;
  sortData: ISortData = { pageIndex: 1, pageSize: this.defaultTestsPerPage };

  // for tests filter
  foundTests: any[] = [];
  search = '';
  testsNotFound = false;

  // tooltip
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // descending sorting by date on init
    this.tests.sort((a, b) => {
      const dateA: any = new Date(a.date).getTime();
      const dateB: any = new Date(b.date).getTime();

      return dateB - dateA;
    });

    this.sortedDescending = true;

    // pagination - tests per page on init
    this.filteredTests = this.tests.slice(0, this.sortData.pageSize);

    // main checkbox disabled if no tests added
    if (!this.tests.length) {
      this.mainCheckboxDisabled = true;
    } else {
      this.mainCheckboxDisabled = false;
    }
  }

  // function on key up while typing search
  // checkboxes behavior
  // block 'no tests found'
  searchKeyUpFunction(): void {
    this.search.trim();

    this.foundTests = this.tests.filter((test) =>
      test.name.toLowerCase().includes(this.search.toLowerCase())
    );

    // if no search
    if (!this.search.trim()) {
      this.testsNotFound = false;
      this.mainCheckboxDisabled = false;

      // main checkbox behavior if no search (for ex. query was deleted)
      const allTestsMarked = this.filteredTests.every((t) => t.marked);
      if (allTestsMarked) {
        this.allComplete = true;
      } else {
        this.allComplete = false;
      }
      return;
    }

    // 'no tests found'
    if (this.foundTests.length) {
      this.testsNotFound = false;
      this.mainCheckboxDisabled = false;
    }
    if (!this.foundTests.length) {
      this.testsNotFound = true;
      this.mainCheckboxDisabled = true;
    }

    // main checkbox behavior if search
    const allFoundTestsMarked = this.foundTests.every((t) => t.marked);
    if (allFoundTestsMarked) {
      this.allComplete = true;
    } else {
      this.allComplete = false;
    }
  }

  // pagination
  onPaginateChange(
    sortData: ISortData = this.sortData,
    tests = this.tests
  ): void {
    this.sortData = sortData;
    // tests per page when user changes options to view
    this.filteredTests = tests.slice(
      sortData.pageIndex * sortData.pageSize,
      sortData.pageIndex * sortData.pageSize + sortData.pageSize
    );
    this.allComplete = false;

    // if all tests marked
    const allTestsMarked = this.filteredTests.every((t) => t.marked);
    if (allTestsMarked) {
      // remain main checkbox cheked
      this.allComplete = true;
    }

    // count number of checked tests
    this.allMarkedTests = this.tests.filter((t) => t.marked).length;
  }

  // paginator - show all tests
  showAllTests(): void {
    this.filteredTests = this.tests;
    this.sortData = { ...this.sortData, pageSize: this.tests?.length ?? 0 };
  }

  // drag & drop items
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.filteredTests,
      event.previousIndex,
      event.currentIndex
    );
  }

  // check-uncheck main checkbox by marking all checkboxes
  updateAllComplete(): void {
    // if search is not applied
    if (!this.search.trim()) {
      this.allComplete =
        this.filteredTests != null && this.filteredTests.every((t) => t.marked);

      // btn 'Print checked' - disabled and active
      const markedTests = this.filteredTests.filter((t) => t.marked).length;
      if (markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    // if search is applied
    if (this.search.trim()) {
      // tests found in search
      this.foundTests = this.tests.filter((test) =>
        test.name.toLowerCase().includes(this.search.toLowerCase())
      );

      this.allComplete =
        this.foundTests != null && this.foundTests.every((t) => t.marked);

      // btn 'Print checked' - disabled and active
      const markedTests = this.foundTests.filter((t) => t.marked).length;
      if (markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    // count number of checked tests
    this.allMarkedTests = this.tests.filter((t) => t.marked).length;
  }

  // main checkbox behavior if some checkboxes marked - changes to "-"
  someComplete(): boolean {
    if (this.tests == null) {
      return false;
    }

    // if search is not applied
    if (!this.search.trim()) {
      return (
        this.filteredTests.filter((t) => t.marked).length > 0 &&
        !this.allComplete
      );
    }

    // if search is applied
    if (this.search.trim()) {
      // tests found in search
      this.foundTests = this.tests.filter((test) =>
        test.name.toLowerCase().includes(this.search.toLowerCase())
      );

      return (
        this.foundTests.filter((t) => t.marked).length > 0 && !this.allComplete
      );
    }
  }

  // check-uncheck all checkboxes by marking main checkbox
  setAll(marked: boolean): void {
    if (this.tests == null) {
      return;
    }

    // if search is not applied
    if (!this.search.trim()) {
      this.filteredTests.forEach((t) => (t.marked = marked));
      this.allComplete = marked;

      // btn 'Print checked' - disabled and active
      const markedTests = this.filteredTests.filter((t) => t.marked).length;
      if (markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    // if search is applied
    if (this.search.trim()) {
      // tests found in search
      this.foundTests = this.tests.filter((test) =>
        test.name.toLowerCase().includes(this.search.toLowerCase())
      );

      this.foundTests.forEach((t) => (t.marked = marked));
      this.allComplete = marked;

      // btn 'Print checked' - disabled and active
      const markedTests = this.foundTests.filter((t) => t.marked).length;
      if (markedTests) {
        this.testsChecked = true;
      } else {
        this.testsChecked = false;
      }
    }

    // count number of checked tests
    this.allMarkedTests = this.tests.filter((t) => t.marked).length;
  }

  // uncheck all tests
  uncheckAllTests(): void {
    // make all tests unmarked
    this.tests.forEach((t) => (t.marked = false));

    // making main checkbox unmarked
    this.allComplete = false;

    // count number of checked tests
    this.allMarkedTests = this.tests.filter((t) => t.marked).length;

    // making "Print checked" button disabled
    this.testsChecked = false;
  }

  // sorting by date
  sortByDate(): void {
    const newTests = [
      ...this.tests.sort((a, b) => {
        const dateA: any = new Date(a.date).getTime();
        const dateB: any = new Date(b.date).getTime();

        return this.sortedDescending ? dateA - dateB : dateB - dateA;
      }),
    ];
    this.sortedDescending = !this.sortedDescending;
    this.onPaginateChange(this.sortData, newTests);
  }

  // print current test
  printCurrentTest(test): void {
    // print current test to console
    console.log('print current test ---->', test);
  }

  // print all tests
  printAllTests(): void {
    if (this.tests == null) {
      return;
    }
    // print all tests to console
    console.log('all tests to print------>', this.tests);
  }

  // print checked tests
  printCheckedTests(): void {
    // choose checked tests
    const markedTests = this.tests.filter((t) => t.marked);
    // print checked tests to console
    console.log('marked tests to print------>', markedTests);
  }

  //PDF
  someContent = 'String to check variable....';

  generatePdf() {
    const documentDefinition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',

        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },

        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        {
          text: [
            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 15 },
            'than the rest.',
          ],
        },

        'Значение внешней переменной: ' + this.someContent,
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  //open test-profile component
  public goToTestPage(event: Event, id: string): void {
    event.stopPropagation();
    this.router.navigate([`test-profile/${id}`]);
  }
}
