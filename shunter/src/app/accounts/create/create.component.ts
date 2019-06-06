import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  accountForm : FormGroup;

  interests: string [] = [
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
    }, { validators: [CreateComponent.checkIfMatchingPasswords, CreateComponent.maxInterests]});
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
}
