import { Component, OnInit } from '@angular/core';
import { NOTICES } from '../notice/mock-notices';
import { APIService} from '../../../account.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  notices = NOTICES;

  constructor() {

  }

  ngOnInit() {
  }



}

