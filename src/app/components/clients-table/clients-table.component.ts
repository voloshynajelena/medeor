import { AfterViewInit, Component, ViewChild, OnChanges, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/types';
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
export class ClientsTableComponent implements AfterViewInit, OnChanges {

  @Input() clients: Client[];

  // устанавливаем названия столбцов и порядок колонок
  displayedColumns: string[] = ['id', 'surname', 'name', 'sex', 'age', 'pregnancy', 'phone', 'email', 'profile', 'add-new'];

  dataSource: MatTableDataSource<Client>;

  expandedElement: User | null;
  // следим за атрибутами сортировки и пагинации
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router) {}

  ngOnChanges(): void{
    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToClient(id): void {
    this.router.navigate([`client/${id}`]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource?.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
