import { Component, OnInit } from '@angular/core';
import { APIService } from '../account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private api: APIService) { }

  ngOnInit() {
    console.log("nav logged in: " + this.api.isLoggedIn());
  }

  loggedIn() {
  	return this.api.isLoggedIn();
  }

  logout() {
  	this.api.logout();
  }

}
