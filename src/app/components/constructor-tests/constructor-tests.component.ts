import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import {TestsService} from '../../services/tests.service';
import {ITestsGroup, ITest} from '../../types';
import { chain } from 'ramda';

@Component({
  selector: 'app-constructor-tests',
  templateUrl: './constructor-tests.component.html',
  styleUrls: ['./constructor-tests.component.less']
})
export class ConstructorTestsComponent implements OnInit {

  testsGroups: ITestsGroup[] = [];
  tests: ITest[] = [];
  loading = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private clientService: ClientService,
    private testsService: TestsService) {}

  ngOnInit(): void {

    this.loading = true;
    this.testsService.getTestsGroups(this.testsService.user.id).subscribe(
      (response: {data: ITestsGroup[]}) => {
        console.log('response ===', response);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);
        this.testsGroups.push(response?.data[0]);

        // TODO kostul logic must be changed on this
        // this.testsGroups = response?.data;
        const getTests = chain(group => group.tests);
        this.tests = getTests(this.testsGroups);
        this.loading = false;
        console.log('this.testsGroups ===', this.tests);
      }
    );
  }
}
