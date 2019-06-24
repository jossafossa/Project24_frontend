import { Component, OnInit } from '@angular/core';
import { APIService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(public api: APIService) { }

  ngOnInit() {
    console.log("test logged in: " + this.api.isLoggedIn());
  }

  login() {
  	this.api.login("admin", "admin");
  }

  addInterests() {
  	this.api.addInterest("zwemmen").subscribe(data => {console.log(data)});
  	this.api.addInterest("fietsen").subscribe(data => {console.log(data)});
  	this.api.addInterest("schommelen").subscribe(data => {console.log(data)});
  }

  getInterests() {
  	this.api.getInterests().subscribe(data => {console.log(data)});
  }

  updateUser() {
  	this.api.updateUser(1, [3,2], ["/home/jossafossa/Pictures/Firefox_wallpaper.png"]).subscribe(data => {console.log(data)});
  }

  getUser() {
  	this.api.getUser(1).subscribe(data => {console.log(data)});
  }

  uploadFile(event) {
    let data = [
      1,
      [],
    ]
    this.api.uploadFile(event,
      (d) => {this.api.updateUser(data[0], [], d ).subscribe(e=>console.log) }
    );
  }

  generateUsers() { 
  console.log("generating users") 
    for(let i = 0; i<10; i++) {
      console.log("users" + (i+1)) 
      let response = this.api.signup("user" + (i+1), "user" + (i+1) + "@user.nl", "asldn1348h##", "asldn1348h##")
      response.subscribe((data)=>console.log);
    } 
  }
}
