import { Component, OnInit } from '@angular/core';
import {APIService} from '../../account.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import * as jwt_decode from "jwt-decode";

const URL = 'http//localhost:4200/api/upload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  accountForm : FormGroup;

  pic1;
  id;
  username;
  interests;
  urls;

  constructor(private api : APIService, private fb : FormBuilder, private router : Router) {
    this.accountForm = fb.group({
      interests : [[]],
      urls : [[]],
    }, { validators: [EditComponent.maxInterests, EditComponent.maxPhotos]});

    this.interests = this.accountForm.controls['interests'];
    this.urls = this.accountForm.controls['urls'];
    // this.id = APIService.user.user_id;

    this.api.getLoggedInUser().subscribe((data: any) => {
      this.id = data.id;
      this.username = data.username;
      this.accountForm.controls['interests'].setValue(data.interests);
      this.accountForm.controls['urls'].setValue(data.pictures);

    //   this.pictures = [
    //     data.pic1,
    //     data.pic2,
    //     data.pic3,
    //     data.pic4,
    //     data.pic5,
    });
  }

  ngOnInit() {
  }

  sendInfo(pictures, interests){
    this.api.updateUser(this.id, this.username, interests, pictures).subscribe(() => {
      this.router.navigate(['accounts', 'view']);
    });
  }

  private static maxPhotos(group: FormGroup){
    if(group.controls.urls.value && group.controls.urls.value.length > 5) {
      return group.controls.urls.setErrors({tooMuch: true});
    } else {
      return group.controls.urls.setErrors(null);
    }
  }

  private static maxInterests(group: FormGroup){
    if(group.controls.interests.value.length != 5){
      return group.controls.interests.setErrors({notEnough : true});
    } else {
      return group.controls.interests.setErrors(null);
    }
  }

  getNotFiveErrorMessage() {
    return this.interests.hasError('notEnough') ? 'You must pick 5\n':
      '';
  }

  onInterestsChange(event) {
    console.log(event);
    this.accountForm.controls['interests'].setValue(event)
    console.log(this.interests);
  }

  // getNotFourErrorMessage(){
  //   return this.urls.hasError('maxLength') ? 'You can only choose 4 photos\n':
  //     '';
  // }

  detectFiles(event) {
    let files = event.target.files;

    this.urls.setValue([]);

    if (files) {
      for (let file of files) {
        this.urls.setValue([
          ...this.urls.value,
          file
        ])
      }
    }
  }
}
