import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../account.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  notices ;

  constructor(
    public api: APIService,
    ) {
  }

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.api.getNotices().subscribe(data => this.notices = data);
  }

  removeNotice(noticeID){
    this.api.removeNotice(noticeID).subscribe(response => {this.getNotices()});
  }


}


