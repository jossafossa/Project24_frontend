import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) {}

  createAccount(email, password, username, status, profilePicture, interests){
    const data = {email, password, username, status, profilePicture, interests};
    this.http.post('http://localhost', data);
  }

}

export class APIService {
  	baseURL = "localhost:8000/";
  	loggedIn = false;
  	token = "";

  	constructor(public http: HttpClient) {
  	}

	login(username, password) {
		let data = {
			"username": username,
			"password": password,
		}
		let token = this.http.post(this.baseURL + "/api/v1/rest-auth/login/", data);
		console.log(token);
	}
}
