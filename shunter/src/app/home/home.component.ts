import { Component, OnInit } from '@angular/core';
import { APIService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUrlArray: (string)[] = [
   "assets/img/cheese.jpg", "assets/placeholder.png"
  ];

  constructor(private api: APIService, private router: Router) { }

  ngOnInit() {
  	if (this.api.isLoggedIn()) {
  		this.router.navigate(["/accounts/view"])
  	}
  }

}
