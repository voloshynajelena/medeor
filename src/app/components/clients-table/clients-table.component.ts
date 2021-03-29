import { AfterViewInit, Component, ViewChild, OnChanges, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client, Test, User } from 'src/app/types';
import { MatDialog } from '@angular/material/dialog';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { ClientService } from '../../services/client.service';
import { DataService } from '../../services/data.service';
import { RemovePatientModalComponent } from '../remove-patient-modal/remove-patient-modal.component';

export const TESTS: Test[] = [
  {
    id: '1',
    name: 'General blood test',
    date: new Date('12 09 2021'),
    marked: false,
    conclusion: 'Platelets above normal range.',
  },
  {
    id: '2',
    name: 'Blood cholesterol test',
    date: new Date('10 04 2020'),
    marked: false,
    conclusion: 'Slightly above normal.',
  },
  {
    id: '3',
    name: 'Blood glucose test',
    date: new Date('12 04 2020'),
    marked: false,
    conclusion: 'Above normal, test was done after eating sweets. Need to retake this test.',
  },
  {
    id: '4',
    name: 'Chromosome testing',
    date: new Date('06 14 2020'),
    marked: false,
    conclusion: 'Fine.',
  },
  { // test element
    id: '5',
    name: 'Brain peptide',
    date: new Date('12 04 2020'),
    marked: false,
    conclusion: 'Fine. Retake in three months.',
  },
  { // test element
    id: '6',
    name: 'Coagulation',
    date: new Date('12 04 2020'),
    marked: false,
    conclusion: 'Almost fine. Extreme limit of the norm. Retake in one month.',
  },
  { // test element
    id: '7',
    name: 'Birch Components',
    date: new Date('12 04 2019'),
    marked: false,
    conclusion: 'Almost fine. Extreme limit of the norm. Retake in one month.',
  },
  { // test element
    id: '8',
    name: 'Beta Carotene',
    date: new Date('12 04 2018'),
    marked: false,
    conclusion: 'Almost fine. Extreme limit of the norm. Retake in one month.',
  },
  { // test element
    id: '9',
    name: 'Calcium',
    date: new Date('12 04 2017'),
    marked: false,
    conclusion: 'Fine. Retake in three months.',
  },
  { // test element
    id: '10',
    name: 'Amino Acid',
    date: new Date('12 04 2010'),
    marked: false,
    conclusion: 'Blood sample taken in DocTap clinic and analysed in the laboratory.',
  },
  { // test element
    id: '11',
    name: 'Coagulation',
    date: new Date('12 04 2010'),
    marked: false,
    conclusion: 'Blood sample taken in DocTap clinic and analysed in the laboratory.',
  },
  { // test element
    id: '12',
    name: 'Acetone',
    date: new Date('12 04 2010'),
    marked: false,
    conclusion: 'Almost fine. Extreme limit of the norm. Retake in one month.',
  },
  { // test element
    id: '13',
    name: 'Coagulation',
    date: new Date('12 04 2013'),
    marked: false,
    conclusion: 'Blood sample taken in DocTap clinic and analysed in the laboratory.',
  },
  { // test element
    id: '14',
    name: 'Liver Function Test',
    date: new Date('12 04 2018'),
    marked: false,
    conclusion: 'Fine.',
  },
  { // test element
    id: '15',
    name: 'Hematocrit',
    date: new Date('10 04 2001'),
    marked: false,
    conclusion: 'Blood sample taken in DocTap clinic and analysed in the laboratory.',
  },
  { // test element
    id: '16',
    name: 'Albumin',
    date: new Date('10 04 2021'),
    marked: false,
    conclusion: 'Almost fine. But it is needed to visit doctor.',
  },
  { // test element
    id: '17',
    name: 'Oldest test',
    date: new Date('10 04 1999'),
    marked: false,
    conclusion: 'The oldest test.',
  },
];

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClientsTableComponent implements AfterViewInit, OnInit, OnChanges {
  // full array of last tests
  tests = TESTS;
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
    private clientService: ClientService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnChanges(): void {
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

  removeClient(event: Event, client: Client): void {
    event.stopPropagation();

    // this.clientService.deletePatient(id).subscribe();

    const dialogRef = this.dialog.open(RemovePatientModalComponent, { data: client });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clientService.deletePatient(client.id).subscribe(resp => {
          const user = JSON.parse(localStorage.getItem('currentUser'));
          this.dataService.getClientsData(user.id).subscribe(data => {
            this.dataSource.data = data.clients;
          });
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    })
  }
}
