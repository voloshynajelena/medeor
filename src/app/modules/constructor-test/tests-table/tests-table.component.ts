import {
  AfterViewInit,
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
import { HttpService } from 'src/app/services/http.service';
import { TestsService } from 'src/app/services/tests.service';
import { ITestsGroup, User } from '../../../types';
import { NewTestComponent } from '../new-test/new-test.component';

@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.scss'],
})
export class TestsTableComponent implements AfterViewInit, OnInit, OnChanges {
  displayedColumns: string[] = ['name', 'code', 'description', 'open'];
  dataSource: MatTableDataSource<ITestsGroup>;
  user: User;
  @Input() tests: ITestsGroup[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private http: HttpService,
    private testsService: TestsService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tests);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToClient(event: Event, id): void {
    event.stopPropagation();
    this.router.navigate([`test/${id}`]);
  }

  openCreateNewTestGroupOverlay(): void {
    const dialogRef = this.dialog.open(NewTestComponent, {
      width: '60%',
      maxWidth: '800px',
      hasBackdrop: true,
      autoFocus: false,
      restoreFocus: false,
      data: {
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe((testsList: any[]) => {
      if (testsList?.length) {
        this.dataSource = new MatTableDataSource(testsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  //delete test
  deleteTest(id) {
    this.testsService.removeTest(id).subscribe();
  }
}
