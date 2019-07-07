import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'group-display',
  templateUrl: './group-display.component.html',
  styleUrls: ['./group-display.component.css']
})
export class GroupDisplayComponent implements OnInit {

	@Input() group;	
	@Output() onLike: EventEmitter<any> = new EventEmitter();
	@Output() onDislike: EventEmitter<any> = new EventEmitter();
	root;
	dragging;
	relPos;
	origin;
	offset;

	constructor(private el: ElementRef) { 
		this.root = el.nativeElement;
	}

	ngOnInit() {
		this.dragging = false;
		this.origin = {x: 0, y:0};
		this.relPos = {x:0, y: 0};
		this.offset = 100;

		document.addEventListener("mousemove", e => this.mouseMove(e));
		document.addEventListener("mouseup", e => this.stopDrag(e));
	}

	startDrag(event) {
		this.dragging = true;
		this.origin = {
			x: event.pageX,
			y: event.pageY
		}
	}

	stopDrag(event) {
		this.dragging = false;
		this.returnElement();
		console.log(this.relPos.x, this.offset);
		if (this.relPos.x > this.offset) {
			console.log("like")
      		this.onLike.emit(null);
		} else if (this.relPos.x < -this.offset) {
			console.log("dislike")
      		this.onDislike.emit(null);
		}
	}

	mouseMove(event) {
		let pos = {x: 0, y:0};
		if (this.dragging) {
			pos.x = event.pageX;
			pos.y = event.pageY;

			this.relPos = this.dif(pos, this.origin);

			this.moveElement(this.relPos);
		}
	}

	moveElement(pos) {
		this.root.style.transform = "translateX(" + (pos.x / 2) + "px)";
	}

	returnElement() {		
		this.root.style.transform = "translateX(0px)";
	}

	dif(pos1, pos2) {
		return {x: pos1.x - pos2.x, y: pos1.y - pos2.y};
	}

}
