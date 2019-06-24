import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GroupAccountService {

  constructor(public http: HttpClient) { }

  createGroupAccount(groupName, groupDescription, groupPicture, interests){
    const data = {groupName, groupDescription, groupPicture, interests};
    this.http.post('http://localhost', data);
  }

  editGroupAccount(nameOfGroup, groupDescription, groupPicture, interests) {
    const editData = {nameOfGroup, groupDescription, groupPicture, interests};
    this.http.post('http://localhost', editData);
  }
}

// export class APIService {

//   constructor(public http: HttpClient) {
//   	this.root = "http://localhost";
//   }

//   swipeGroup(string: groupName, boolean: like) {
//   	this.http.post('http://localhost', data);
//   }


// }
