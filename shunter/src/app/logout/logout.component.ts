import { Component, OnInit } from '@angular/core';
import { APIService } from '../account.service';
import { Router} from '@angular/router';

@Component({
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private aap : APIService, private r : Router) {

  }

  ngOnInit() {
    this.aap.logout();
    this.r.navigate(["/"]);
  }

}
