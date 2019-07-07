import { Component, OnInit } from '@angular/core';
import {APIService} from '../../../account.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {Location} from '@angular/common';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  noticeForm: FormGroup;
  subject;
  noticeText;
  postedBy;
  groupID;
  noticeID;
  constructor(
    public api: APIService,
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  )
  {
    this.noticeForm = fb.group({
      subject : ['', [Validators.required,  Validators.maxLength(45)]],
      noticeText : ['', [Validators.required, Validators.maxLength(255)]],
    }, { validators: []});

    this.subject = this.noticeForm.controls['subject'];
    this.noticeText = this.noticeForm.controls['noticeText'];
  }

  ngOnInit() {
    this.noticeID = this.route.snapshot.paramMap.get('noticeID');
    this.groupID = this.route.snapshot.paramMap.get('id');
    this.api.getLoggedInUser().subscribe(d => {
      console.log(d);
      // this.postedBy = d.name;
    })
    console.log(this.groupID);
    this.getNoticeID();
  }
  
  addNotice() {
    console.log("Adding notice", this.subject.value, this.noticeText.value, this.postedBy);
   this.api.addNotice(this.subject.value, this.noticeText.value, this.postedBy, this.groupID)
     .subscribe(this.location.back());
  }

  //get noticeID
  getNoticeID() {
    console.log(this.noticeID);
    this.api.getNotice(this.noticeID).subscribe(data => {
      console.log(data);
      this.setInfo(data);
    });
    }

  setInfo(data) {
    this.noticeForm.controls['subject'].setValue(data.subject);
    this.noticeForm.controls['noticeText'].setValue(data.noticeText);
  }

  updateNotice(){
    console.log("update notice", this.subject.value, this.noticeText.value, this.postedBy);
    this.api.updateNotice(this.noticeID, this.subject.value, this.noticeText.value).
    subscribe(this.location.back());
  }
}
