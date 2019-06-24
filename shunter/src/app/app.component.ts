import { Component } from '@angular/core';
import { APIService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shunter';
  token = "";
  constructor(public api: APIService ) {}
}
