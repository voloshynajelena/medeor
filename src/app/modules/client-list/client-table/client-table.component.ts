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
import { ClientService } from '../../../services/client.service';
import { Client, User } from '../../../types';
import { getAge } from '../../../utils/date';
import { TESTS } from '../../../mocks/clients-list-response';
import { NewClientComponent } from '../new-client/new-client.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements AfterViewInit, OnInit, OnChanges {
  user: User;
  tests = TESTS;
  dateFormat: string = dateFormat;
  gender: typeof Gender = Gender;
  displayedColumns: string[] = [
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
  dataSource: MatTableDataSource<Client>;
  expandedElement: any;
  getAge = getAge;

  @Input() clients: Client[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,

    private dialog: MatDialog,
    private clientService: ClientService
  ) {}

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

  openCreateNewClientOverlay(): void {
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
