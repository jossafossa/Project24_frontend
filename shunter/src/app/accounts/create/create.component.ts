import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private as : AccountService, private fb : FormBuilder) {
    this.accountForm = fb.group({
      email : ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      password : ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(50)]],
      username : ['',[Validators.required, Validators.maxLength(50)]],
      confirmPass : ['',[Validators.required]],
      profilePicture : ['', Validators.required],
      status : ['', [Validators.required, Validators.maxLength(120)]],
      interests : fb.array(this.interests.map((value, i) => (
        [i === 0]
      ))),
    }, { validators: [CreateComponent.checkIfMatchingPasswords
        ]});// CreateComponent.maxInterests] });
  }

  ngOnInit() {
  }

  sendInfo(email, password, username, status, profilePicture){
    console.log(email, password, username, status, profilePicture);
    this.as.createAccount(email, password, username, status, profilePicture);
  }

  // private static maxInterests(group: FormGroup){
  //   const interestArray = group.controls.interest;
  //   return interestArray.hasError('required') ? 'You must pick 5\n':
  //
  //     '';
  // }

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
