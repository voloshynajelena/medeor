import { Component, OnInit } from '@angular/core';
import {TestsService} from '../../services/tests.service';
import {ITestsGroup, ITest} from '../../types';

@Component({
  selector: 'app-constructor-tests',
  templateUrl: './constructor-tests.component.html',
  styleUrls: ['./constructor-tests.component.less']
})
export class ConstructorTestsComponent implements OnInit {

  testsGroups: ITestsGroup[] = [];
  tests: ITest[] = [];
  loadingTestGroups = false;
  loadingTests = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private testsService: TestsService
    ) {}

  ngOnInit(): void {
    this.loadingTestGroups = true;
    this.loadingTests = true;
    this.testsService.getTestsGroups(this.testsService.user.id).subscribe(
      (response: {data: ITestsGroup[]}) => {
        this.testsGroups = response?.data;
        this.loadingTestGroups = false;
      }
    );

    this.testsService.getTestsTemplates().subscribe(
      (response: {data: ITest[]}) => {
        this.tests = response?.data;
        this.loadingTests = false;
      }
    );
  }
}
