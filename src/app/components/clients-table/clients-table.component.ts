import { AfterViewInit, Component, ViewChild, OnChanges, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Client, Test, User} from 'src/app/types';
import {MatDialog} from '@angular/material/dialog';
import {NewPatientComponent} from '../new-patient/new-patient.component';
import {ClientService} from '../../services/client.service';

export const TESTS: Test[] = [
  {
    id: '1',
    name: 'General blood test',
    date: new Date('12.09.2020'),
  },
  {
    id: '2',
    name: 'Blood cholesterol test',
    date: new Date('10.04.2020'),
  },
  {
    id: '3',
    name: 'Blood glucose test',
    date: new Date('12.04.2020'),
  },
  {
    id: '4',
    name: 'Chromosome testing',
    date: new Date('6.14.2020'),
  },
  { // test element
    id: '5',
    name: '5',
    date: new Date('12.04.2020'),
  },
  { // test element
    id: '6',
    name: '6',
    date: new Date('12.04.2020'),
  },
];

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClientsTableComponent implements AfterViewInit, OnInit, OnChanges {
  // full array of last tests
  tests = TESTS;
  // tests: Test[] = [
  //   {
  //     id: '1',
  //     name: 'General blood test',
  //     date: new Date('12.09.2020'),
  //   },
  //   {
  //     id: '2',
  //     name: 'Blood cholesterol test',
  //     date: new Date('10.04.2020'),
  //   },
  //   {
  //     id: '3',
  //     name: 'Blood glucose test',
  //     date: new Date('12.04.2020'),
  //   },
  //   {
  //     id: '4',
  //     name: 'Chromosome testing',
  //     date: new Date('6.14.2020'),
  //   },
  //   { // test element
  //     id: '5',
  //     name: '5',
  //     date: new Date('12.04.2020'),
  //   },
  //   { // test element
  //     id: '6',
  //     name: '6',
  //     date: new Date('12.04.2020'),
  //   },
  // ];
  // end code for last-tests-widget component
  displayedColumns: string[] = ['id', 'surname', 'name', 'sex', 'age', 'pregnancy', 'phone', 'email', 'profile', 'add-new', 'remove'];
  dataSource: MatTableDataSource<Client>;
  user: User;
  expandedElement: any;
  @Input() clients: Client[];
  // следим за атрибутами сортировки и пагинации
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router,
              private dialog: MatDialog,
              private clientService: ClientService) {}

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

  goToClient(event: Event, id): void {
    event.stopPropagation();
    this.router.navigate([`client/${id}`]);
  }

  removeClient(event: Event, id): void {
    event.stopPropagation();
    this.clientService.deletePatient(id).subscribe();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateNewPatientOverlay(): void {
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
