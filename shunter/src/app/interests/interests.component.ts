import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {APIService} from '../account.service';

@Component({
  selector: 'interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {


  interests: object [] = [];

  selected: number [] = [];
  @Output() valueChange = new EventEmitter();

  constructor(private api : APIService) { }

  ngOnInit() {
  	this.api.getInterests().subscribe((d) => {
  		console.log("interets: ", d);
  		this.interests = d.sort((a, b) => {return a.name.localeCompare(b.name);});
  	});  	
  }

  change(event, options) {
    const list = options.selected.map((item) => {
      return item.value
    });

    this.valueChange.emit(list);
  }

}
