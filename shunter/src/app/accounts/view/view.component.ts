import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../../account.service';

type User = {
  username: string;
  status: string;
  pic1: string;
  pic2: string;
  pic3: string;
  pic4: string;
  pic5: string;
}


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  image;
  username;
  status;
  pictures;
  groups = [];

  constructor(private api: APIService, private router : Router) {

    this.api.getLoggedInUser().subscribe((data: User) => {
      this.username = data.username;
      this.status = data.status;
      this.pictures = [
        data.pic1,
        data.pic2,
        data.pic3,
        data.pic4,
        data.pic5,
      ].filter(x => !!x)
    });
  }

  getGroups() {
    this.api.getGroups().subscribe(e => {/*this.groups = e; */console.log(e)});
  }

  ngOnInit() {
    this.getGroups();
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
