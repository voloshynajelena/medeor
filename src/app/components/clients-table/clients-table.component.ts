import { AfterViewInit, Component, ViewChild, OnChanges, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client, Test } from 'src/app/types';
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

  // code for last-tests-widget component

  //full array of last tests
  tests: Test[] = [
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
  // end code for last-tests-widget component

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
