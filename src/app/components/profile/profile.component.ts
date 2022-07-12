import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/types';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
  clients: Client[];
  loading = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loading = true;
    this.clientService.getClients(this.user?.userId).subscribe((data: any) => {
      this.clients = data.clients;
      this.loading = false;
    });
  }
}
