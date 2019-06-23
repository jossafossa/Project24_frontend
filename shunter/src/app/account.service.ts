import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseURL = "http://localhost:8000";
  loggedInSubject: BehaviorSubject<boolean>;
  loggedIn: Observable<boolean>;
  token = "";
  options = {};
  user;
  form;

  constructor(public http: HttpClient, private formBuilder: FormBuilder) {
    this.loggedInSubject = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') == 'true');
    this.loggedIn = this.loggedInSubject.asObservable();
    this.token = localStorage.getItem('token');

    if (this.token) {
      this.user = jwt_decode(this.token);
      this.options = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': "JWT " + this.token,
        })
      };
    }
  }

  setToken(token) {
    localStorage.setItem('isLoggedIn', 'true');
    this.loggedInSubject.next(true);
    localStorage.setItem('token', token);
    this.token = token;
    this.user = jwt_decode(this.token);
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "JWT " + token,
      })
    };
  }

	login(username, password) {
		let data = {
			"username": username,
			"password": password,
		}
    let endpoint = "/api/v1/rest-auth/login/";
    return this.http.post(this.baseURL + endpoint, data)
      .subscribe((d) => {this.setToken(d["token"]);})
	}

	logout(){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    this.token = null;
    this.loggedInSubject.next(false);
  }

  signup(username, email, password1, password2) {
    let data = {
      "username": username,
      "email": email, 
      "password1": password1,
      "password2": password2
    };
    let endpoint = "/api/v1/rest-auth/registration/";
    return this.http.post(this.baseURL + endpoint, data)
      .subscribe((d) => {this.setToken(d["token"]);})
  };

  getUser(userID) {
    let endpoint = "/api/v1/users/" + userID;
    return this.http.get(this.baseURL + endpoint, this.options)
  }

  getLoggedInUser() {
    let endpoint = "/api/v1/users/" + this.user.user_id;
    return this.http.get(this.baseURL + endpoint, this.options)
  }

  uploadFile(imageEvent, callback) {
    let image = imageEvent;


    // get image from events

    let file = image.target.files[0];

    var reader = new FileReader();
    reader.addEventListener('load', (e) => {callback(e.target["result"])});
    reader.readAsText(file);
    console.log(file);
  }

  updateUser(userID, interests = [], images) {
    let data = {
      "interests": interests
    }
    for(let i = 0; i < images.length; i++) {
      let image = images[i];

      if (i < 5) {
        data["pic" + (i+1)] = image;
      }
    }
    console.log(data);
    let endpoint = "/api/v1/users/" + userID;
    return this.http.put(this.baseURL + endpoint, data, this.options)
  }

  readFile(event) {
    console.log(event.target.result);
  }

  addInterest(interest) {    
    let data = {
      "name": interest
    };
    let endpoint = "/api/v1/interests/";
    return this.http.post(this.baseURL + endpoint, data, this.options)
  }
  
  getInterests() {   
    let endpoint = "/api/v1/interests/";
    return this.http.get(this.baseURL + endpoint, this.options)
  }


}
