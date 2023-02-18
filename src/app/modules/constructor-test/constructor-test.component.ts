import { Component, OnInit } from '@angular/core';

import { TestsService } from '../../services/tests.service';
import { ITest, ITestsGroup } from '../../types';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-constructor-test',
  templateUrl: './constructor-test.component.html',
  styleUrls: ['./constructor-test.component.scss'],
})
export class ConstructorTestComponent implements OnInit {
  public testsGroups: ITestsGroup[] = [];
  public tests: ITest[] = [];
  public loadingTestGroups = false;
  public loadingTests = false;

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
