import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  baseURL = 'http://localhost:8000';
  static loggedIn: boolean;
  static token = '';
  static options = {};
  static user;
  form;

  constructor(
    public http: HttpClient,
    private formBuilder: FormBuilder, 
    private router: Router
  ) {
    APIService.loggedIn = localStorage.getItem('isLoggedIn') == 'true';
    APIService.token = localStorage.getItem('token');

    if (APIService.token) {
      APIService.user = jwt_decode(APIService.token);
      APIService.options = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': "JWT " + APIService.token,
        })
      };
    }
  }

  setToken(token) {
    localStorage.setItem('isLoggedIn', 'true');
    APIService.loggedIn = true;
    localStorage.setItem('token', token);
    APIService.token = token;
    APIService.user = jwt_decode(token);
    APIService.options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "JWT " + token,
      })
    };
  }

// Definities van Requests
  request(method, endpoint, data = {}, loginRequired = true) {
    let response;
    if (loginRequired) {
      if (!this.isLoggedIn()) {
        this.router.navigate(['login']);
        return;
      }
    }
    switch(method) {
      case "post":
        response = this.http.post(this.baseURL + endpoint, data, APIService.options);
        break;
      case "get":          
        response = this.http.get(this.baseURL + endpoint, APIService.options);
        break;
      case "put":          
        response = this.http.put(this.baseURL + endpoint, data, APIService.options);
        break;
      case "patch":          
        response = this.http.patch(this.baseURL + endpoint, data, APIService.options);
        break;
    }
    return response;
  }

// user-related stuff
	login(username, password) {
		let data = {
			"username": username,
			"password": password,
		}
    let endpoint = "/api/v1/rest-auth/login/";
    let response = this.http.post(this.baseURL + endpoint, data);
    response.subscribe((d) => {this.setToken(d["token"]); APIService.loggedIn = true;})

    return response;
	}

  isLoggedIn() {
    return (APIService.token !== "" && APIService.loggedIn);
  }

  logout() {
    APIService.token = "";
    APIService.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
	}

  signup(username, email, password1, password2, interests = [], pictures = [], callback) {
    let formData = new FormData();

    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password1);
    formData.append('password2', password2);

    for(let i = 0; i < interests.length; i++) {
      formData.append('interests', interests[i]);
    }

    for(let i = 0; i < pictures.length; i++) {
      formData.append('pic' + (i + 1), pictures[i], pictures[i].name);
    }

    console.log(formData);
    let endpoint = "/api/v1/rest-auth/registration/";
    let response = this.http.post(this.baseURL + endpoint, formData);
    response.subscribe((d) => {
      this.setToken(d["token"]);
      callback();
    })
    return response;
  };

  getUser(userID) {
    let endpoint = "/api/v1/users/" + userID;
    return this.request("get", endpoint);
  }

  //Group stuff
  getGroup(groupID) {     
    let endpoint = "/api/v1/friendcircle/" + groupID;
    return this.request("get", endpoint);
  }

  editGroup(groupID, name, description, interests = []) {
    let data = {
      "name": name, 
      "description": description,
      "interests": interests
    }
    let endpoint = "/api/v1/friendcircle/" + groupID;
    return this.request("patch", endpoint, data);
  }

  createGroup(name, description, interests = []) {
    let data = {
      "name": name, 
      "description": description,
      "interests": interests
    };
    let endpoint = "/api/v1/friendcircle/";
    return this.request("post", endpoint, data);
  }

  getLoggedInUser() {
    let endpoint = "/api/v1/users/" + APIService.user.user_id;
    return this.http.get(this.baseURL + endpoint, APIService.options)
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

  getGroups() {
    let endpoint = "/api/v1/friendcircle/GetMyMemberships";
    return this.request("get", endpoint);
  }

// Interests
  addInterest(interest) {    
    let data = {
      "name": interest
    };
    let endpoint = "/api/v1/interests/";
    return this.request("post", endpoint, data);
  }
  
  getInterests() {   
    let endpoint = "/api/v1/interests/";
    return this.request("get", endpoint, {}, false);
  }


  // like/dislike stuff
  getNextUser() {
    let endpoint = "/api/v1/friendcircle/getCandidate"; // endpoint is wrong
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

  //Noticeboard stuff
  // TODO: endpoints uitwerken, hoe doe ik per groep iets halen?

  getNotices(noticeID){
    let endpoint = '/api/v1/prikmuur/' + noticeID;
    return this.request('get', endpoint);
  }
  addNotice(subject, noticeText,postedBy) {
    let data =
      {
        "subject": subject,
        "notice_text": noticeText,
        "postedBy": postedBy
      };
       let endpoint = 'api/v1/prikmuur/';
       return this.request("post", endpoint, data);
  }
  updateNotice(){
 //   let data = ?
 //   let endpoint = 'api/v1/prikmuur/' + noticeID;
 //   return this.request("patch", endpoint, data);
  }
  removeNotice(){
    //   let data = ?
    //   let endpoint = 'api/v1/prikmuur/' + noticeID;
    //   return this.request("delete", endpoint, data);
}
  
}
