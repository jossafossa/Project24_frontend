import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../account.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { MustMatch } from './_helpers/must-match.validator';
// import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  accountForm : FormGroup;

  constructor(private as : AccountService, private fb : FormBuilder) {
    this.accountForm = fb.group({
      email : ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      password : ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(50)]],
      username : ['',[Validators.required, Validators.maxLength(50)]],
      confirmPass : ['',[Validators.required]],
      // profilePicture : ['', Validators.required],
      status : ['', [Validators.required, Validators.maxLength(120)]],
    }, { validators: [this.checkIfMatchingPasswords] });
  }

  // this.accountForm.controls('password').value)]

  ngOnInit() {
  }

  sendInfo(email, password, username, status){
    console.log(email, password, username, status);
    this.as.createAccount(email, password, username, status);
  }

  private checkIfMatchingPasswords(group: FormGroup) {
    const passwordInput = group.controls.password;
    const passwordInputConfirm = group.controls.confirmPass;

    if (passwordInput.value !== passwordInputConfirm.value) {
      return passwordInputConfirm.setErrors({notEquivalent: true});
    } else {
      return passwordInputConfirm.setErrors(null);
    }
  }
}
