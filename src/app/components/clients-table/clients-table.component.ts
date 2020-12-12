import { AfterViewInit, Component, ViewChild, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.less'],
})
export class ClientsTableComponent implements AfterViewInit, OnChanges {

  @Input() clients: Client[];

  // устанавливаем названия столбцов и порядок колонок
  displayedColumns: string[] = ['id', 'surname', 'name', 'sex', 'age', 'pregnancy', 'phone', 'email', 'profile', 'add-new'];

  dataSource: MatTableDataSource<Client>;

  // следим за атрибутами сортировки и пагинации
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router) {}

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToClient(id) {
    this.router.navigate([`client/${id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
