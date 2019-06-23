import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrlArray: (string)[] = [
   "assets/img/cheese.jpg", "assets/groupOfNormies.jpg", "assets/groupOfEmos.jpg"
  ];

  constructor() { }

  ngOnInit() {
  }

}
