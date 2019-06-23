import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(public api: APIService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit(e) {
    this.api.login(this.username, this.password);
    this.router.navigate(['/']);
  }

} 
