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
  userID: string;
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
      this.getUserID();
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
  request(method, endpoint, data = {}, loginRequired = true, options = null) {
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
        response = this.http.put(this.baseURL + endpoint, data, options || APIService.options);
        break;
      case "patch":
        response = this.http.patch(this.baseURL + endpoint, data, APIService.options);
        break;
      case "delete":
        response = this.http.delete(this.baseURL + endpoint, APIService.options);
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
    response.subscribe((d) => {this.setToken(d["token"]); APIService.loggedIn = true; this.getUserID()})

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

  getUserID() { 
    let endpoint = "/api/v1/users/GetMyUser";
    this.request("get", endpoint).subscribe(data => {
      console.log(data);
      this.userID = data.id;
    });
  }

  signup(username, email, password1, password2, callback) {
    let formData = new FormData();

    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password1);
    formData.append('password2', password2);

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

  getMembersByID(members) {
    console.log(members);
    return new Promise((resolve, reject) => {
      let resolved = [];
      for (let userID of members) {      
        this.getUser(userID).subscribe(
          member => {
            resolved.push(member);
            if (resolved.length == members.length ) {
              resolve(resolved);
            }
          }, 
          error => {
            reject(error);
          }
        )
      }  
    });
  }

  getGroupsByID(groups) {
    console.log("getting groups:", groups);
    return new Promise((resolve, reject) => {
      let resolved = [];
      for (let groupID of groups) {      
        this.getGroup(groupID).subscribe(
          group => {
            console.log(group);
            resolved.push(group);
              console.log(resolved);
            if (resolved.length == groups.length ) {
              resolve(resolved);
            }
          }, 
          error => {
            reject(error);
          }
        )
      }  
    });
      
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

  updateUser(userID, username, interests = [], images = []) {
    // let data = {
    //   "interests": interests
    // }

    let formData = new FormData();
    formData.append('username', username)

    interests.forEach((interest) => {
      formData.append('interests', interest);
    });

    for(let i = 0; i < images.length; i++) {
      let image = images[i];

      if (i < 5) {
        formData.append("pic" + (i+1), image);
      }
    }

    let endpoint = "/api/v1/users/" + userID;
    return this.request("put", endpoint, formData, true, {
      headers: new HttpHeaders({
        'Authorization': "JWT " + APIService.token,
      })
    });
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
  getNextUser(groupID) {
    let endpoint = "/api/v1/friendcircle/getCandidateUser/" + groupID; // endpoint is wrong
    return this.request("get", endpoint);
  }

  likeUser(groupID, userID) {
    let endpoint = "/api/v1/friendcircle/SwipeCandidateUser/" + groupID;
    let data = {
        "user": userID,
        "swipe_choice": "V"
    }
    return this.request("post", endpoint, data);
  }

  dislikeUser(groupID, userID) {
    let endpoint = "/api/v1/friendcircle/SwipeCandidateUser/" + groupID;
    let data = {
        "user": userID,
        "swipe_choice": "X"
    }
    return this.request("post", endpoint, data);
  }


   // like/dislike stuff
  getNextGroup() {
    let endpoint = "/api/v1/friendcircle/getCandidateFriendCircle"; // endpoint is wrong
    return this.request("get", endpoint);
  }


  likeGroup(groupID) {
    console.log("group liked")
    let endpoint = "/api/v1/friendcircle/SwipeCandidateFriendCircle";
    let data = {
        "friendcircle": groupID,
        "swipe_choice": "V"
    }
    return this.request("post", endpoint, data);
  }

  dislikeGroup(groupID) {
    console.log("group disliked")
    let endpoint = "/api/v1/friendcircle/SwipeCandidateFriendCircle";
    let data = {
        "friendcircle": groupID,
        "swipe_choice": "X"
    }
    return this.request("post", endpoint, data);
  }

  //Noticeboard stuff
  // TODO: endpoints uitwerken, hoe doe ik per groep iets halen?

  getNotices(groupID){
    let endpoint = '/api/v1/prikmuur/getGroup/' + groupID;
    return this.request('get', endpoint);
  }

  getNotice(noticeID){
    let endpoint = '/api/v1/prikmuur/' + noticeID;
    return this.request('get', endpoint);
  }

  addNotice(subject, noticeText, postedBy, group) {
    let data = {
        "subject": subject,
        "noticeText": noticeText,
        "postedBy": postedBy,
        "group": group,
      };
       let endpoint = '/api/v1/prikmuur/getGroup/' + group;
       return this.request("post", endpoint, data);
  }


  updateNotice(noticeID, subject, noticeText) {
    let data = {
        "subject": subject,
        "noticeText": noticeText
    };
    let endpoint = '/api/v1/prikmuur/' + noticeID;
    console.log("///////////////");
    console.log(data);
    console.log("///////////////");
    return this.request("patch", endpoint, data);
  }

  removeNotice(noticeID){
    let endpoint = '/api/v1/prikmuur/' + noticeID;
    return this.request("delete", endpoint);
}
  
}
