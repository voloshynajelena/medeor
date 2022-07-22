import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { TestsService } from 'src/app/services/tests.service';
import { ITest, Test } from 'src/app/types';
import { TESTS } from '../clients-table/clients-table.component';

@Component({
  selector: 'app-test-profile',
  templateUrl: './test-profile.component.html',
  styleUrls: ['./test-profile.component.scss']
})
export class TestProfileComponent implements OnInit {
  private testId: string
  public test: ITest
  public loading = false
  
  constructor(
    private route: ActivatedRoute,
    private testService : TestsService
    ) { }

  ngOnInit(): void {
    this.loading = true;
    
    this.route.params.subscribe( (params: Params) => {
      this.testId = params.testid })

    this.testService.getTestsTemplates().subscribe( ({data}) => {
      this.test = data.find(test => test.typeId === this.testId)
    })

    this.loading = false;
  }

  goBack(): void {
    history.back()
  }

}
