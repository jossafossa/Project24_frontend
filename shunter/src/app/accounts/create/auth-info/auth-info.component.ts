import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-info',
  templateUrl: './auth-info.component.html',
  styleUrls: ['./auth-info.component.css']
})
export class AuthInfoComponent implements OnInit {
  @Input() accountForm : FormGroup;
  email;
  password;
  confirmPass;

  constructor() { }

  ngOnInit() {
    this.email = this.accountForm.controls['email'];
    this.password = this.accountForm.controls['password'];
    this.confirmPass = this.accountForm.controls['confirmPass'];
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
