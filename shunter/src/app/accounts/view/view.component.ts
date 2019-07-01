import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {APIService} from '../../account.service';

type User = {
  username: string;
  status: string;
  interests: [];
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
  interests;
  pictures;
  groups: {};

  constructor(
    private api: APIService, 
    private router : Router, 
    private route : ActivatedRoute) {
    
  }

  ngOnInit() {
    let userID = this.route.snapshot.paramMap.get("id");
    if (userID) {
      this.api.getUser(userID).subscribe((data) => {
        this.setData(data);
      });
    } else {
      this.api.getLoggedInUser().subscribe((data) => {
        this.setData(data);
      });
    }
    // this.getGroups();
  }

  setData(data) {   
      this.username = data.username;
      this.interests = data.interests;
      this.status = data.status;
      this.pictures = [
        data.pic1,
        data.pic2,
        data.pic3,
        data.pic4,
        data.pic5,
      ].filter(x => !!x);     
      this.api.getGroupsByID(data.memberships).then(groups => {
        console.log("groups: ", groups);
        this.groups = groups;
      })
  }

  // getGroups() {
  //   this.api.getGroups().subscribe(e => {this.groups = e; console.log(e)});
  // }


  toSwipe() {
    this.router.navigate(['accounts', 'swipe']);
  }

  toEdit(){
    this.router.navigate(['accounts', 'edit']);
  }

  toNewGroupAccount() {
    this.router.navigate(['group-accounts', 'create']);
  }

  goToGroup(id){
    this.router.navigate(['group-accounts', 'view', id]);
  }

  maximizeImage(image) {
    this.image = image;

  }
}
