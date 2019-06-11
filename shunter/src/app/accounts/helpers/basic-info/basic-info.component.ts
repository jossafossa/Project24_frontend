import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';

const URL = 'http//localhost:4200/api/upload';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  // username = new FormControl('', [Validators.required, Validators.pattern('Joyce'), Validators.maxLength(70)]);
  // status = new FormControl('', [Validators.required, Validators.maxLength(120)]);
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  @Input() accountForm : FormGroup;
  username;
  status;
  profilePicture;

  constructor() { }

  ngOnInit() {
    this.username = this.accountForm.controls['username'];
    this.status = this.accountForm.controls['status'];
    this.profilePicture = this.accountForm.controls['profilePicture'];
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value\n'
      : this.username.hasError('maxLength') ? 'Youve succeeded the max length\n':
        '';
  //      suspecious characters
  }

  getStatusErrorMessage() {
    return this.status.hasError('required') ? 'You must enter a value\n'
      : this.status.hasError('maxLength') ? 'Youve succeeded the max length\n':
        '';
  }
}
