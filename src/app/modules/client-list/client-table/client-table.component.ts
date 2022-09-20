import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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

import { dateFormat, Gender } from 'src/app/constants';
import { TESTS } from '../../../mocks/clients-list-response';
import { Client, User } from '../../../types';
import { getAge } from '../../../utils/date';
import { NewClientComponent } from '../new-client/new-client.component';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ClientTableComponent implements AfterViewInit, OnInit, OnChanges {
  public expandedElement: any;
  public dataSource: MatTableDataSource<Client>;
  public tests = TESTS;
  public dateFormat: string = dateFormat;
  public gender: typeof Gender = Gender;
  public displayedColumns: string[] = [
    'id',
    'surname',
    'name',
    'sex',
    'age',
    'pregnancy',
    'phone',
    'email',
    'profile',
    'add-new',
  ];

  private user: User;

  public getAge = getAge;

  @Input() clients: Client[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router, private dialog: MatDialog) {}

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

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public goToClient(event: Event, id): void {
    event.stopPropagation();
    this.router.navigate([`client/${id}`]);
  }

  public openCreateNewClientOverlay(): void {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '90%',
      height: '95%',
      maxWidth: '100%',
      hasBackdrop: true,
      autoFocus: false,
      restoreFocus: false,
      data: {
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe((data: Client) => {
      this.dataSource.data = [...this.dataSource.data, data];
    });
  }
}
