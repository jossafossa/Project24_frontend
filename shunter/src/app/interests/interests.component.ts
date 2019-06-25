import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {APIService} from '../account.service';

@Component({
  selector: 'interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {


  interests: object [] = [
    {
    	id: 1,
    	name: 'music'
    },
    {
    	id: 2,
    	name: 'photography' 
    },
    {
    	id: 3,
    	name: 'movies'
    },
    {
    	id: 4,
    	name: 'skateboarding' 
    },
    {
    	id: 5,
    	name: 'music' 
    },
    {
    	id: 6,
    	name: 'gaming' 
    }
  ];

  selected: number [] = [];
  @Output() valueChange = new EventEmitter();

  constructor(private api : APIService) { }

  ngOnInit() {
  	this.api.getInterests().subscribe((d) => {
  		console.log("interetss: ", d);
  		this.interests = d;
  	});  	
  }

  change(event) {

  	console.log(event);
  	let id = event.target.id;
  	let checked = event.target.checked;

  	if (checked) {
  		this.selected.push(id);
  	} else {
  		var index = this.selected.indexOf(id);
			if (index !== -1) this.selected.splice(index, 1)
  	}

  	this.valueChange.emit(this.selected);
  }

}
