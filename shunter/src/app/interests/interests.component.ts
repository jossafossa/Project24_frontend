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
  		console.log("interetss: ", d);
  		this.interests = d.sort((a, b) => {return a.name.localeCompare(b.name);});
  	});  	
  }

  change(event) {

  	console.log(event);
  	let id = parseInt(event.target.id);
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
