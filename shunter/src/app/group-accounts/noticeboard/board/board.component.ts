import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../../../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  notices = [];
  @Input() groupID: number;

  constructor(
    public api: APIService,
    public router : Router
    ) {
  }

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.api.getNotices(this.groupID).subscribe(data => {
      for(let notice of data) {
        notice.created = this.calcTime(notice.created);
        this.notices.push(notice);
      }
      this.notices = data
    });
  }

  editNotice(noticeID) {
    console.log(noticeID);
    this.router.navigate(["/group-accounts", "board", this.groupID, "notice", noticeID])
  }

  calcTime(date) {
    var dateFirst = new Date(date);
    var dateSecond = new Date();

    // time difference
    var timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());

    // days difference
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays == 1 ? "posted today" : "posted " + diffDays + " days ago";
  }

  removeNotice(noticeID){
    this.api.removeNotice(noticeID).subscribe(response => {this.getNotices()});
  }


}


