import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GroupAccountService} from '../../group-account.service';

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

  constructor(private as : GroupAccountService, private fb : FormBuilder, private router : Router) {
    this.accountForm = fb.group({
      nameOfGroup : ['',[Validators.required, Validators.maxLength(50)]],
      groupPicture : ['', Validators.required],
      groupDescription : ['', [Validators.required, Validators.maxLength(120)]],
      interests : [''],
    }, { validators: [CreateComponent.maxInterests]});
  }

  ngOnInit() {
  }

  sendInfo(nameOfGroup, groupDescription, groupPicture, interests){
    console.log(nameOfGroup, groupDescription, groupPicture, interests, this.accountForm);
    this.as.createGroupAccount(nameOfGroup, groupDescription, groupPicture, interests);
    this.router.navigate(['group-accounts', 'view']);
  }

  private static maxInterests(group: FormGroup){
    if(group.controls.interests.value.length != 5){
      return group.controls.interests.setErrors({notEnough : true});
    } else {
      return group.controls.interests.setErrors(null);
    }
  }
}
