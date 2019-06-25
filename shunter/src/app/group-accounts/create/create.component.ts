import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {APIService} from '../../account.service';
import {FileUploader} from 'ng2-file-upload';

const URL = 'http//localhost:4200/api/upload';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  accountForm : FormGroup;
  nameOfGroup;
  groupDescription;
  groupPicture;
  interests;
  group;

  interestList: string [] = [];

  constructor(private api : APIService, private fb : FormBuilder, private router : Router) {
    this.accountForm = fb.group({
      nameOfGroup : ['',[Validators.required, Validators.maxLength(50)]],
      groupPicture : ['', Validators.required],
      groupDescription : ['', [Validators.required, Validators.maxLength(120)]],
      interests : [''],
    }, { validators: [CreateComponent.maxInterests]});


    this.nameOfGroup = this.accountForm.controls['nameOfGroup'];
    this.groupDescription = this.accountForm.controls['groupDescription'];
    this.groupPicture = this.accountForm.controls['groupPicture'];
    this.interests = this.accountForm.controls['interests'];
  }

  ngOnInit() {
    this.api.getGroup(1).subscribe((data) => {
      console.log(data);
      this.group = data;
    })
  }

  onInterestsChange(event) {
    console.log(event);
    this.accountForm.controls['interests'].setValue(event);
  }

  sendInfo(nameOfGroup, groupDescription, groupPicture, interests){
    // console.log(nameOfGroup, groupDescription, groupPicture, interests, this.accountForm);
    // return;
    this.api.createGroup(nameOfGroup, groupDescription, interests).subscribe(data => {
      this.router.navigate(['group-accounts', 'view']);
      console.log(data);
    });
  }

  private static maxInterests(group: FormGroup){
    if(group.controls.interests.value.length != 5){
      return group.controls.interests.setErrors({notEnough : true});
    } else {
      return group.controls.interests.setErrors(null);
    }
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

  getNotFiveErrorMessage() {
    return this.interests.hasError('notEnough') ? 'You must pick 5\n':
      '';
  }
}
