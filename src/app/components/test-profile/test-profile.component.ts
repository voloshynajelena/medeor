import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Test } from 'src/app/types';
import { TESTS } from '../clients-table/clients-table.component';

@Component({
  selector: 'app-test-profile',
  templateUrl: './test-profile.component.html',
  styleUrls: ['./test-profile.component.scss']
})
export class TestProfileComponent implements OnInit {
  private allTests: Test[] = TESTS
  private testId: string
  public test: Test

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      this.testId = params.testid })
    this.test = this.allTests.find(t => t.id === this.testId)
    console.log(this.test)
  }

}
