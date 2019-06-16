import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

const URL = 'http//localhost:4200/api/upload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  accountForm : FormGroup;

  username;
  status;
  profilePicture;
  email;
  password;
  confirmPass;
  interests;

  interestList: string [] = [
    'music', 'photography', 'movies', 'skateboarding', 'makeup', 'gaming'
  ];

  constructor(private as : AccountService, private fb : FormBuilder, private router : Router) {
    this.accountForm = fb.group({
      email : ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      password : ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(50)]],
      username : ['',[Validators.required, Validators.maxLength(50)]],
      confirmPass : ['',[Validators.required]],
      profilePicture : ['', Validators.required],
      status : ['', [Validators.required, Validators.maxLength(120)]],
      interests : [''],
    }, { validators: [EditComponent.checkIfMatchingPasswords, EditComponent.maxInterests]});

    this.username = this.accountForm.controls['username'];
    this.status = this.accountForm.controls['status'];
    this.profilePicture = this.accountForm.controls['profilePicture'];
    this.email = this.accountForm.controls['email'];
    this.password = this.accountForm.controls['password'];
    this.confirmPass = this.accountForm.controls['confirmPass'];
    this.interests = this.accountForm.controls['interests'];
  }

  ngOnInit() {
  }

  sendInfo(email, password, username, status, profilePicture, interests){
    console.log(email, password, username, status, profilePicture, interests);
    this.as.createAccount(email, password, username, status, profilePicture, interests);
    this.router.navigate(['accounts', 'view']);
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
        '';
    //      suspecious characters
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
}
