import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  clients: Client[];
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.dataService.getClientsData(this.user?.userId).subscribe(
      (data: any) => {
        this.clients = data.clients;
      }
    );
  }

}
