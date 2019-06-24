import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) {}

  createAccount(email, password, username, status, profilePicture, interests){
    const createData = {email, password, username, status, profilePicture, interests};
    this.http.post('http://localhost', createData);
  }
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseURL = "http://localhost:8000";
  loggedIn = false;
  token = "";
  options = {};
  form;

  constructor(
    public http: HttpClient, 
    private formBuilder: FormBuilder, 
    private router: Router
  ) {}

  setToken(token) {
    this.token = token;
    this.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "JWT " + token,
      })
    };
  }

  request(method, endpoint, data = {}) {
    let response;
    console.log(this.isLoggedIn());
    if (this.isLoggedIn()) {
      switch(method) {
        case "post":
          response = this.http.post(this.baseURL + endpoint, data, this.options);
          break;
        case "get":          
          response = this.http.get(this.baseURL + endpoint, this.options);
          break;
        case "put":          
          response = this.http.put(this.baseURL + endpoint, data, this.options);
          break;
        case "patch":          
          response = this.http.patch(this.baseURL + endpoint, data, this.options);
          break;
      }      
    } else {
      this.router.navigate(['login']);
    } 
    return response;
  }


	login(username, password) {
		let data = {
			"username": username,
			"password": password,
		}
    let endpoint = "/api/v1/rest-auth/login/";
    let response = this.http.post(this.baseURL + endpoint, data);
    response.subscribe((d) => {this.setToken(d["token"]); this.loggedIn = true;})

    return response;
	}

  isLoggedIn() {
    return (this.token !== "" && this.loggedIn) ? true : false;
  }

  logout() {
    this.token = "";
    this.loggedIn = false;
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
  };

  getUser(userID) {
    let endpoint = "/api/v1/users/" + userID;
    return this.request("get", endpoint);
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

  updateUser(userID, interests: number[] = [], images = []) {
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
    return this.request("put", endpoint, data);
  }

  readFile(event) {
    console.log(event.target.result);
  }

  addInterest(interest) {    
    let data = {
      "name": interest
    };
    let endpoint = "/api/v1/interests/";
    return this.request("post", endpoint, data);
  }
  
  getInterests() {   
    let endpoint = "/api/v1/interests/";
    return this.request("get", endpoint);
  }

  getNextUser() {
    let endpoint = "/api/v1/matcher/getUser/";
    return this.request("get", endpoint);
  }

  like(userID) {
    console.log("TODO: liked")
    // let endpoint = "/api/v1/matcher/getUser/";
    // let data = {
    //   "userID": userID,
    //   "like": true
    // }
    // return this.request("get", endpoint, data);
  }

  dislike(userID) {
    console.log("TODO: disliked")
    // let endpoint = "/api/v1/matcher/getUser/";
    // let data = {
    //   "userID": userID,
    //   "like": false
    // }
    // return this.request("get", endpoint, data);
  }


}
