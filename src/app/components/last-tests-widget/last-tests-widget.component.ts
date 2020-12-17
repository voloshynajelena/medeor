import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/app/types';

@Component({
  selector: 'app-last-tests-widget',
  templateUrl: './last-tests-widget.component.html',
  styleUrls: ['./last-tests-widget.component.less']
})
export class LastTestsWidgetComponent implements OnInit {

  @Input() test: Test;
  
  constructor() { }

  ngOnInit(): void {
  }

}
