import { Component, OnInit } from '@angular/core';
import { APIService } from './../../account.service';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {

  group = {
    "id": 1,
    "image": "",
    "name": "henk",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos laudantium voluptatibus tempora illum asperiores? Maxime facere, quod ad distinctio, cumque, consequuntur expedita repellendus quisquam eveniet nemo unde id, aliquid ea. Praesentium tenetur et, nisi aperiam illo assumenda reprehenderit dolore quasi."
  }

  constructor(public api: APIService) { }

  ngOnInit() { 
    let next = this.api.getNextUser(); 	
    next.subscribe((data) => {this.setGroup(data[0]); console.log(data)});
  }
  
  like() {
    this.api.like(this.group["id"]);

    let next = this.api.getNextUser();
    next.subscribe((data) => {this.setGroup(data[0]); console.log(data)});
  }

  setGroup(data) {
    this.group = {
      "id": data["id"],
      "image": data["pic1"],
      "name": data["username"],
      "text": data["username"] + " is cool!",
    }
  }

  dislike() {
    this.api.dislike(this.group["id"]);

    let next = this.api.getNextUser();
    next.subscribe((data) => {this.setGroup(data[0]); console.log(data)});
  }

}
