import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../../account.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  interests: array;
  name: string;
  description: string;

  constructor(
    private router : Router,
    public api: APIService
  ) { }

  ngOnInit() {
    this.api.getGroup(this.api.userID).subscribe(data => {
      console.log(data);
    })
  }

  toSwipe() {
    this.router.navigate(['group-accounts', 'swipe']);
  }

  toEdit(){
    this.router.navigate(['group-accounts', 'edit']);
  }

  toNewGroupAccount() {
    this.router.navigate(['groupaccounts', 'create']);
  }

  goToMember() {
    this.router.navigate(['accounts', 'view']);
  }

  maximizeImage() {

  }
}
