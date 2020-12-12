import { AfterViewInit, Component, ViewChild, OnInit, OnChanges, Input } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.less']
})
export class ClientsTableComponent implements AfterViewInit, OnChanges {
  // ждем данные от родительской компоненты
  @Input() clients: Client[];

  // устанавливаем названия столбцов и порядок колонок
  displayedColumns: string[] = ['id', 'surname', 'name', 'sex', 'age', 'pregnancy', 'phone', 'email', 'profile', 'add-new'];
  
  dataSource: MatTableDataSource<Client>;

  // следим за атрибутами сортировки и пагинации
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router) {}

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // МЕТОД applyFilter() срабатывает на keyup

  goToClient(id) {
    this.router.navigate([`client/${id}`]);
  }

  // МЕТОД applyFilter() срабатывает на keyup

  applyFilter(event: Event) {
    // достаем значение переменной для фильтрации из пришедшего события
    const filterValue = (event.target as HTMLInputElement).value;

    // устанавливаем значение переменной для фильтрации и обрезаем пробелы
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // обновляем первую страницу пагинации
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
