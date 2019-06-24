import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.css']
})
export class GroupDisplayComponent implements OnInit {

	@Input() group: Object;

	constructor() { }

	ngOnInit() {

	}

}
