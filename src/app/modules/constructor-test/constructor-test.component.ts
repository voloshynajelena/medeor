import { Component, OnInit } from '@angular/core';

import { TestsService } from '../../services/tests.service';
import { ITest, ITestsGroup } from '../../types';

@Component({
  selector: 'app-constructor-test',
  templateUrl: './constructor-test.component.html',
  styleUrls: ['./constructor-test.component.scss'],
})
export class ConstructorTestComponent implements OnInit {
  testsGroups: ITestsGroup[] = [];
  tests: ITest[] = [];
  loadingTestGroups = false;
  loadingTests = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private testsService: TestsService) {}

  ngOnInit(): void {
    this.loadingTestGroups = true;
    this.loadingTests = true;
    this.testsService
      .getTestsGroupsTemplates()
      .subscribe((response: { data: ITestsGroup[] }) => {
        this.testsGroups = response?.data;
        this.loadingTestGroups = false;
      });

    this.testsService
      .getTestsTemplates()
      .subscribe((response: { data: ITest[] }) => {
        this.tests = response?.data;
        this.loadingTests = false;
      });
  }
}
