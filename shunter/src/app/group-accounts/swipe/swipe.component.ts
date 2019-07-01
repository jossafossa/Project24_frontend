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
    next.subscribe((data) => {
      console.log(data); 
      this.setGroup(data[0]);
    });
  }
  
  like() {
    this.api.likeUser(this.group["id"]).subscribe(d => console.log(d));

    let next = this.api.getNextUser();
    next.subscribe((data) => {this.setGroup(data[0]); console.log(data)});
  }

  setGroup(data) {  
    console.log("data:", data);
    this.group = {
      "id": data["id"],
      "image": data["pic1"],
      "name": data["name"],
      "text": data["description"],
    }
  }

  dislike() {
    this.api.dislikeUser(this.group["id"]);

    let next = this.api.getNextUser();
    next.subscribe((data) => {this.setGroup(data[0]); console.log(data)});
  }

}
