import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: APIService) { }

  ngOnInit() {
  }

  onSubmit(e) {
    this.api.login("henk", "pietje");
  	console.log(e);
  }

}
