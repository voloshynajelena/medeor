import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  data: User;
  userId: string;
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,

    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(({userId}) => {
      this.userId = userId;
    })
    this.dataService.getUserData(this.userId).subscribe(
      (data: any) => {
        console.log(data);
        this.data = data
      }
    )
  }

}
