import { Component, OnInit } from '@angular/core';
import {APIService} from '../../../account.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {CreateComponent} from '../../create/create.component';
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
  group;
  constructor(public api: APIService, private fb : FormBuilder) {
    this.noticeForm = fb.group({
      subject : ['', [Validators.required,  Validators.maxLength(45)]],
      noticeText : ['', [Validators.required, Validators.maxLength(255)]],
    }, { validators: []});

    this.subject = this.noticeForm.controls['subject'];
    this.noticeText = this.noticeForm.controls['noticeText'];
  }

  ngOnInit() {
    this.addNotice();
  }
  
  addNotice() {
    console.log("adding notice", this.subject.value, this.noticeText.value, this.postedBy);
   this.api.addNotice(this.subject.value, this.noticeText.value, this.postedBy).subscribe(data => {console.log(data)});
  }
}
