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
  nameOfGroup;
  groupDescription;
  groupPicture;

  constructor() { }

  ngOnInit() {
    this.nameOfGroup = this.accountForm.controls['nameOfGroup'];
    this.groupDescription = this.accountForm.controls['groupDescription'];
    this.groupPicture = this.accountForm.controls['groupPicture'];
  }

  getGroupNameErrorMessage() {
    return this.nameOfGroup.hasError('required') ? 'You must enter a value\n'
      : this.nameOfGroup.hasError('maxLength') ? 'Youve succeeded the max length\n':
        '';
  //      suspecious characters
  }

  getDescriptionErrorMessage() {
    return this.groupDescription.hasError('required') ? 'You must enter a value\n'
      : this.groupDescription.hasError('maxLength') ? 'Youve succeeded the max length\n':
        '';
  }
}
