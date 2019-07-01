import { Component, OnInit } from '@angular/core';
import {APIService} from '../../../account.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  constructor(
    public api: APIService,
  ) { }

  ngOnInit() {
    this.addNotice();
  }
  addNotice() {
   // this.api.addNotice()
  }
}
