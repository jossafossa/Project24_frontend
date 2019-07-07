import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {APIService} from '../../account.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  interests: any[];
  name: string;
  description: string;
  members: {};
  groupID;

  constructor(
    private router : Router,
    public api: APIService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {    
    this.groupID = this.route.snapshot.paramMap.get("id");
    if (this.groupID) {
      this.api.getGroup(this.groupID).subscribe(data => {
        this.setData(data);
      })
    } else {
      this.api.getGroup(this.api.userID).subscribe(data => {
        this.setData(data);
      })
    }

    

  }

  setData(data) {
    this.name = data.name;
    this.description = data.description;
    this.interests = data.interests;
    console.log(data);
    this.api.getMembersByID(data.members).then(members => {
      // console.log("membetsa  sdkabsdk h");
      console.log("members:", members); 
      this.members = members
    });
    console.log(data);
  }

  toSwipe() {
    this.router.navigate(['group-accounts', 'swipe', this.groupID]);
  }

  toEdit(){
    this.router.navigate(['group-accounts', 'edit']);
  }

  toNewGroupAccount() {
    this.router.navigate(['groupaccounts', 'create']);
  }

  goToMember(id) {
    console.log(id);
    this.router.navigate(['accounts', 'view', id]);
  }

  maximizeImage() {

  }
}
