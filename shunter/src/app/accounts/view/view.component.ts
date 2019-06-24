import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  image;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  toSwipe() {
    this.router.navigate(['accounts', 'swipe']);
  }

  toEdit(){
    this.router.navigate(['accounts', 'edit']);
  }

  toNewGroupAccount() {
    this.router.navigate(['group-accounts', 'create']);
  }

  goToGroup(){
    this.router.navigate(['group-accounts', 'view']);
  }

  maximizeImage(image) {
    this.image = image;

  }
}
