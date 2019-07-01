import { Component, OnInit } from '@angular/core';
import { APIService} from '../../account.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
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

  username;
  email;
  password;
  confirmPass;

  constructor(private as : APIService, private fb : FormBuilder, private router : Router) {
    this.accountForm = fb.group({
      email : ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      password : ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(50)]],
      username : ['', [Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9 \\\'\\-]+$')]],
      confirmPass : ['',[Validators.required]],
    }, { validators: [CreateComponent.checkIfMatchingPasswords]});

    this.username = this.accountForm.controls['username'];
    this.email = this.accountForm.controls['email'];
    this.password = this.accountForm.controls['password'];
    this.confirmPass = this.accountForm.controls['confirmPass'];
  }

  ngOnInit() {
  }

  sendInfo(email, username, password, confirmPass){
    this.as.signup(username, email, password, confirmPass, () => {
      this.router.navigate(['accounts', 'view'])
    });
    // .pipe(() => {
    //   this.router.navigate(['accounts', 'view']);
    // });
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
}
