import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ITest, Test } from 'src/app/types';

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
export class ClientTestsTableComponent implements OnChanges {
  @Input() tests: Test[];

  // checkboxes
  public allMarkedTests = 0;
  public allComplete = false;
  public mainCheckboxDisabled = false;
  public sortedDescending = true; // tests sorted descending true by default
  public testsChecked = false; // btn 'Print checked' is disabled if false

  // for pagination
  public numberClientTests: number;
  public pageSizeOptions: number[];
  public defaultTestsPerPage = 5;
  public filteredTests: Test[] = [];
  public showPageSizeOptions = true;
  public showFirstLastButtons = true;
  public pageEvent: PageEvent;
  private sortData: ISortData = {
    pageIndex: 1,
    pageSize: this.defaultTestsPerPage,
  };

  // for tests filter
  public search = '';
  public testsNotFound = false;
  private foundTests: any[] = [];

  // tooltip
  private positionOptions: TooltipPosition[] = [
    'below',
    'above',
    'left',
    'right',
  ];
  public position = new FormControl(this.positionOptions[1]);

  // TODO: remove when use real data for PDF
  private someContent = 'String to check variable....';

  constructor(private router: Router) {
    this.numberClientTests = this.tests?.length;
    this.pageSizeOptions = [5, 10, 25, 100, this.tests?.length];
  }

  ngOnChanges(): void {
    // descending sorting by date on init
    this.tests = this.makeMockData(this.tests)?.sort((a, b) => {
      const dateA: number = new Date(a.date).getTime();
      const dateB: number = new Date(b.date).getTime();
      return dateB - dateA;
    });

    this.sortedDescending = true;
    this.filteredTests = this.tests?.slice(0, this.sortData.pageSize); // pagination - tests per page on init
    this.mainCheckboxDisabled = !this.tests?.length; // main checkbox disabled if no tests added
  }

  // function on key up while typing search
  // checkboxes behavior
  // block 'no tests found'
  public searchKeyUpFunction(): void {
    this.search.trim();
    this.foundTests = this.tests?.filter((test) =>
      test.name.toLowerCase().includes(this.search.toLowerCase())
    );

    // if no search
    if (!this.search.trim()) {
      const allTestsMarked = this.filteredTests.every((t) => t.marked); // main checkbox behavior if no search (for ex. query was deleted)
      this.testsNotFound = false;
      this.mainCheckboxDisabled = false;
      this.allComplete = !!allTestsMarked;
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

    const allFoundTestsMarked = this.foundTests.every((t) => t.marked); // main checkbox behavior if search
    this.allComplete = !!allFoundTestsMarked;
  }

  // pagination
  public onPaginateChange(
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

    const allTestsMarked = this.filteredTests.every((t) => t.marked); // if all tests marked
    if (allTestsMarked) {
      this.allComplete = true; // remain main checkbox checked
    }

    this.allMarkedTests = this.tests.filter((t) => t.marked).length; // count number of checked tests
  }

  // paginator - show all tests
  public showAllTests(): void {
    this.filteredTests = this.tests;
    this.sortData = { ...this.sortData, pageSize: this.tests?.length ?? 0 };
  }

  // drag & drop items
  public drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.filteredTests,
      event.previousIndex,
      event.currentIndex
    );
  }

  // check-uncheck main checkbox by marking all checkboxes
  public updateAllComplete(): void {
    // TODO: make one method from these two ifs below
    // if search is not applied
    if (!this.search.trim()) {
      this.allComplete =
        this.filteredTests != null &&
        this.filteredTests?.every((t) => t.marked);

      // btn 'Print checked' - disabled and active
      const markedTests = this.filteredTests?.filter((t) => t.marked).length;
      this.testsChecked = !!markedTests;
    }

    // if search is applied
    if (this.search.trim()) {
      // tests found in search
      this.foundTests = this.tests.filter((test) =>
        test.name.toLowerCase().includes(this.search.toLowerCase())
      );

      this.allComplete =
        this.foundTests != null && this.foundTests?.every((t) => t.marked);
      const markedTests = this.foundTests?.filter((t) => t.marked).length; // btn 'Print checked' - disabled and active
      this.testsChecked = !!markedTests;
    }

    this.allMarkedTests = this.tests.filter((t) => t.marked).length; // count number of checked tests
  }

  // main checkbox behavior if some checkboxes marked - changes to "-"
  public someComplete(): boolean {
    if (this.tests == null) {
      return false;
    }

    // if search is not applied
    if (!this.search.trim()) {
      return (
        this.filteredTests?.filter((t) => t.marked).length > 0 &&
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
        this.foundTests?.filter((t) => t.marked).length > 0 && !this.allComplete
      );
    }
  }

  // check-uncheck all checkboxes by marking main checkbox
  public setAll(marked: boolean): void {
    if (this.tests == null) {
      return;
    }

    // if search is not applied
    if (!this.search.trim()) {
      this.filteredTests.forEach((t) => (t.marked = marked));
      this.allComplete = marked;
      const markedTests = this.filteredTests.filter((t) => t.marked).length; // btn 'Print checked' - disabled and active
      this.testsChecked = !!markedTests;
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
      this.testsChecked = !!markedTests;
    }

    // count number of checked tests
    this.allMarkedTests = this.tests.filter((t) => t.marked).length;
  }

  // uncheck all tests
  public uncheckAllTests(): void {
    this.allComplete = false; // making main checkbox unmarked
    this.testsChecked = false; // making "Print checked" button disabled
    this.tests.forEach((t) => (t.marked = false)); // make all tests unmarked
    this.allMarkedTests = this.tests.filter((t) => t.marked).length; // count number of checked tests
  }

  // sorting by date
  public sortByDate(): void {
    const newTests = [
      ...this.tests.sort((a, b) => {
        const dateA: number = new Date(a.date).getTime();
        const dateB: number = new Date(b.date).getTime();
        return this.sortedDescending ? dateA - dateB : dateB - dateA;
      }),
    ];
    this.sortedDescending = !this.sortedDescending;
    this.onPaginateChange(this.sortData, newTests);
  }

  // print current test
  public printCurrentTest(test): void {
    // TODO: print current test to PDF
    console.log('print current test ---->', test);
  }

  // print all tests
  printAllTests(): void {
    if (this.tests == null) {
      return;
    }
    // TODO: print all tests to PDF
    console.log('all tests to print------>', this.tests);
  }

  // print checked tests
  printCheckedTests(): void {
    const markedTests = this.tests.filter((t) => t.marked); // choose checked tests
    // TODO: print checked tests to PDF
    console.log('marked tests to print------>', markedTests);
  }

  // TODO: implementing PDF generating
  public generatePdf(): void {
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

        'Variable from ts file: ' + this.someContent,
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  // open test-profile component
  public goToTestPage(event: Event, id: string): void {
    event.stopPropagation();
    this.router.navigate([`test-profile/${id}`]);
  }

  // TODO: remove this mapping when data from BE will be correct
  private makeMockData(tests: ITest[]): Test[] {
    return tests?.map((test, i) => ({
      ...test,
      id: test.typeId,
      date: new Date(i),
      name: test.title.en,
      marked: false,
      conclusion: test.description?.en,
    }));
  }
}
