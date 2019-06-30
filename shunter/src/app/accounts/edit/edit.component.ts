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
  status;
  profilePicture;
  email;
  password;
  confirmPass;
  interests;
  urls;

  interestList: string [] = [];

  constructor(private api : APIService, private fb : FormBuilder, private router : Router) {
    this.accountForm = fb.group({
      password : ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(50)]],
      username : ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 \\\'\\-]+$')]],
      confirmPass : [''],
      profilePicture : [''],
      status : ['', Validators.maxLength(120)],
      interests : [[]],
      urls : [[]],
    }, { validators: [EditComponent.checkIfMatchingPasswords, EditComponent.maxInterests, EditComponent.maxPhotos]});

    this.username = this.accountForm.controls['username'];
    this.status = this.accountForm.controls['status'];
    this.profilePicture = this.accountForm.controls['profilePicture'];
    this.email = this.accountForm.controls['email'];
    this.password = this.accountForm.controls['password'];
    this.confirmPass = this.accountForm.controls['confirmPass'];
    this.interests = this.accountForm.controls['interests'];
    this.urls = this.accountForm.controls['urls'];
    // this.id = APIService.user.user_id;

    this.api.getLoggedInUser().subscribe((data: any) => {
      this.id = data.user_id;
      this.accountForm.controls['username'].setValue(data.username);
      this.accountForm.controls['status'].setValue(data.status);
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
    this.api.updateUser(this.id, pictures, interests);
    this.router.navigate(['accounts', 'view']);
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

  private static checkIfMatchingPasswords(group: FormGroup) {
    const passwordInput = group.controls.password;
    const passwordInputConfirm = group.controls.confirmPass;

    if (passwordInput.value !== passwordInputConfirm.value) {
      return passwordInputConfirm.setErrors({notEquivalent: true});
    } else {
      return passwordInputConfirm.setErrors(null);
    }
  }

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value\n'
      : this.username.hasError('maxLength') ? 'Youve succeeded the max length\n':
        this.username.hasError('pattern') ? 'Username cant contain special characters':
        '';
  }

  getStatusErrorMessage() {
    return this.status.hasError('required') ? 'You must enter a value\n'
      : this.status.hasError('maxLength') ? 'Youve succeeded the max length\n':
        '';
  }

  getEmailErrorMessage(){
    return this.email.hasError('required') ? 'You must enter a value\n'
      : this.email.hasError('email') ? 'Not a valid email\n':
        '';
  }

  getPasswordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value\n'
      : this.password.hasError('pattern') ? 'Weak password\n':
        '';
  }

  getNotSameErrorMessage(){
    return this.confirmPass.hasError('required') ? 'You must enter a value\n'
      :  this.confirmPass.hasError('pattern') ? 'Doesnt match \n':
        '';
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
