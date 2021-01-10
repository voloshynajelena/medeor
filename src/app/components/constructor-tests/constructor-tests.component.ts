import { Component, OnInit } from '@angular/core';
import { Client } from '../../types';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-constructor-tests',
  templateUrl: './constructor-tests.component.html',
  styleUrls: ['./constructor-tests.component.less']
})
export class ConstructorTestsComponent implements OnInit {

  clients: Client[];
  loading = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.clientService.getClients(this.user?.userId).subscribe(
      (data: any) => {
        this.clients = data.clients;
        this.loading = false;
      }
    );
  }
}
