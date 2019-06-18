import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: APIService) { }

  ngOnInit() {
  }

  onSubmit(e) {
    this.api.login("admin", "admin");
    setTimeout(
      () => {
        this.api.addInterest("huppelen");
        this.api.addInterest("touwtje springen");
        this.api.addInterest("gebruikers pesten");
        this.api.addInterest("zeeegels verzamelen");

        this.api.getInterests().subscribe((data) => {
          console.log(data);
        })

        this.api.updateUser(
          1,
          [1,2,3,4], 
          ["henk", "piet", "klaas", "jezus", "maria", "je moeder", "klaas", "hans"]
        ).subscribe(data => console.log);
      }, 2000
    )
  }

}
