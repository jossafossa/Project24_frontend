import { Component, OnInit } from '@angular/core';
import { APIService } from './../../account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {
  id;
  group = {
    "id": 1,
    "image": "",
    "name": "henk",
    "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos laudantium voluptatibus tempora illum asperiores? Maxime facere, quod ad distinctio, cumque, consequuntur expedita repellendus quisquam eveniet nemo unde id, aliquid ea. Praesentium tenetur et, nisi aperiam illo assumenda reprehenderit dolore quasi."
  }

  constructor(
    public api: APIService,
    private route: ActivatedRoute) { }

  ngOnInit() { 
    this.id = this.route.snapshot.paramMap.get("id");
    let next = this.api.getNextUser(this.id); 	 
    next.subscribe((data) => {
      // console.log(data); 
      this.setData(data); 
    });
  }
  
  like() {
    console.log("liking jo");
    this.api.likeUser(this.id, this.group["id"]).subscribe(e => console.log(e));
    let next = this.api.getNextUser(this.id);
    next.subscribe((data) => {this.setData(data); });
  }

  setData(data) {  
    if (data.username != "") {
      console.log("response data:", data);
      this.group = {
        "id": data["id"],
        "image": data["pic1"],
        "name": data["username"],
        "text": data["description"],
      }
    } else {
      this.empty();
    }
  }

  empty() {
    console.log("youre all out, je bent een slet");
  }

  dislike() {
    console.log("disliking jo");
    this.api.dislikeUser(this.id, this.group["id"]).subscribe(e => console.log(e));

    let next = this.api.getNextUser(this.id);
    next.subscribe((data) => {this.setData(data)});
  }

}
