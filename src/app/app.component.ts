import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  code = 'DP1L1';
  data: any;
  constructor(private service: DataService) {}
  ngOnInit() {
    this.service.getData(this.code).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
