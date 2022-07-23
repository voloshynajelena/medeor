import { Component, OnInit } from '@angular/core';

import { ClientService } from '../../services/client.service';
import { Client } from '../../types';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  public clients: Client[];
  public loading = false;

  private user = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.clientService.getClients(this.user?.userId).subscribe((data: any) => {
      this.clients = data.clients;
      this.loading = false;
    });
  }
}
