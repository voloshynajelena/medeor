import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Client, User} from '../../types';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NewPatientComponent} from '../new-patient/new-patient.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ClientService} from '../../services/client.service';
import {TestsService} from '../../services/tests.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-grouped-tests-table',
  templateUrl: './grouped-tests-table.component.html',
  styleUrls: ['./grouped-tests-table.component.less']
})
export class GroupedTestsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'open', 'remove'];
  dataSource: MatTableDataSource<UserData>;
  testsGroups;
  user;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private testsService: TestsService) {

    this.testsService.getTestsGroups(this.testsService.user.id).subscribe(
      (response) => {
        console.log('===', response);
        this.testsGroups = response.data;
      }
    );
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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

  removeClient(event: Event, id): void {
    event.stopPropagation();
    // this.clientService.deleteClient(id).subscribe();
    console.log('TEST DELETED', id);
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
