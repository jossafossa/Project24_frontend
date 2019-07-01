import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { APIService } from '../account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  username = "";
  password = "";

  constructor(public api: APIService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit(e) {
    let form = this.loginForm.value;
    this.api.login(form.username, form.password).subscribe(
      () => this.router.navigate(['/'])
    );
  }

} 
