import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NewPatientComponent} from '../new-patient/new-patient.component';
import {ITestsGroup, User} from '../../types';

@Component({
  selector: 'app-grouped-tests-table',
  templateUrl: './grouped-tests-table.component.html',
  styleUrls: ['./grouped-tests-table.component.less']
})
export class GroupedTestsTableComponent implements AfterViewInit, OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'name', 'description', 'open'];
  dataSource: MatTableDataSource<ITestsGroup>;
  user: User;
  @Input() testsGroups: ITestsGroup[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog) {}

  ngOnInit(): void{
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.testsGroups);
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
    this.dialog.open(NewPatientComponent, {
      width: '90%',
      height: '95%',
      maxWidth: '100%',
      hasBackdrop: true,
      autoFocus: false,
      restoreFocus: false,
      data: {
        user: this.user,
      }
    });
  }
}
