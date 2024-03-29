import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { TestsService } from 'src/app/services/tests.service';
import { ITest } from 'src/app/types';

@Component({
  selector: 'app-test-profile',
  templateUrl: './test-profile.component.html',
  styleUrls: ['./test-profile.component.scss'],
})
export class TestProfileComponent implements OnInit, OnDestroy {
  public test: ITest;
  public loading = false;

  private testId: string;
  private testIdSubscription: Subscription;
  private testSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private testService: TestsService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.testIdSubscription = this.route.params.subscribe((params: Params) => {
      this.testId = params.testid;
    });

    this.testSubscription = this.testService
      .getTestsTemplates()
      .subscribe(({ data }) => {
        this.test = data.find((test) => test.typeId === this.testId);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.testIdSubscription.unsubscribe();
    this.testSubscription.unsubscribe();
  }

  public goBack(): void {
    history.back();
  }
}
