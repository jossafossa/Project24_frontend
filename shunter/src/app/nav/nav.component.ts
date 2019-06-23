import { Component, OnInit } from '@angular/core';
import {APIService} from '../account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedIn;

  constructor(private as : APIService) {
    as.loggedIn.subscribe(x => this.loggedIn = x)
  }

  ngOnInit() {
  }

}
