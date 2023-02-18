import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ITestsGroup, User } from '../../../types';
import { NewTestGroupComponent } from '../new-test-group/new-test-group.component';

@Component({
  selector: 'app-grouped-tests-table',
  templateUrl: './grouped-tests-table.component.html',
  styleUrls: ['./grouped-tests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupedTestsTableComponent
  implements AfterViewInit, OnInit, OnChanges
{
  public displayedColumns: string[] = ['name', 'description', 'open'];
  public dataSource: MatTableDataSource<ITestsGroup>;
  private user: User;

  @Input() testsGroups: ITestsGroup[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.testsGroups);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public showTestGroupDetail(event: Event, testGroup): void {
    event.stopPropagation();
    // TODO: show group test details
    console.log('testGroup--->', testGroup);
  }

  public openCreateNewTestGroupOverlay(): void {
    this.dialog.open(NewTestGroupComponent, {
      width: '600%',
      maxWidth: '800px',
      hasBackdrop: true,
      autoFocus: false,
      restoreFocus: false,
      data: {
        user: this.user,
      },
    });
  }
}
