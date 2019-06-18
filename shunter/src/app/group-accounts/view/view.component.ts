import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  toSwipe() {
    this.router.navigate(['group-accounts', 'create']);
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
