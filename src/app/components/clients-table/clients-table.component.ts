import { AfterViewInit, Component, ViewChild, OnChanges, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Client, Test, User } from 'src/app/types';

import { ClientService } from '../../services/client.service';
import { getAge } from '../../utils/date';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { dateFormat, Gender } from 'src/app/constants';

export const TESTS: Test[] = [
  {
    id: '1',
    name: 'General blood test',
    date: new Date('12/09/2020'),
  },
  {
    id: '2',
    name: 'Blood cholesterol test',
    date: new Date('10/04/2020'),
  },
  {
    id: '3',
    name: 'Blood glucose test',
    date: new Date('12/04/2020'),
  },
  {
    id: '4',
    name: 'Chromosome testing',
    date: new Date('06/14/2020'),
  },
  { // test element
    id: '5',
    name: '5',
    date: new Date('12/04/2020'),
  },
  { // test element
    id: '6',
    name: '6',
    date: new Date('12/04/2020'),
  },
];


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClientsTableComponent implements AfterViewInit, OnInit, OnChanges {

  user: User;
  tests = TESTS;
  dateFormat: string = dateFormat;
  gender: typeof Gender = Gender;
  displayedColumns: string[] = ['id', 'surname', 'name', 'sex', 'age', 'pregnancy', 'phone', 'email', 'profile', 'add-new'];
  dataSource: MatTableDataSource<Client>;
  expandedElement: any;
  getAge = getAge;

  @Input() clients: Client[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router,
              private dialog: MatDialog
  ) {}


  ngOnInit(): void{
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges(): void{
    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToClient(event: Event, id): void {
    event.stopPropagation();
    this.router.navigate([`client/${id}`]);
  }

  openCreateNewPatientOverlay(): void {
    const dialogRef = this.dialog.open(NewPatientComponent, {
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

    dialogRef.afterClosed().subscribe((data: Client) => {
      this.clients.push(data);
      this.dataSource.data = this.clients;
    });
  }
}
