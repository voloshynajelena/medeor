import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/types';
import { TESTS } from '../clients-table/clients-table.component';

@Component({
  selector: 'app-test-profile',
  templateUrl: './test-profile.component.html',
  styleUrls: ['./test-profile.component.less']
})
export class TestProfileComponent implements OnInit {
  test: Test[];
  constructor(

  ) { }

  ngOnInit(): void {
  }


  private getTests() {
    // TODO: get data when they will be created on DB
    this.test = TESTS.find(test => test.id = navId);
  }
}
