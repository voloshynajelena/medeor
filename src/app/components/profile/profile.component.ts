import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  clients: Client[];
  loading = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private dataService: DataService,
    ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getClientsData(this.user?.userId).subscribe(
      (data: any) => {
        this.clients = data.clients;
        this.loading = false;
      }
    );
  }

}
