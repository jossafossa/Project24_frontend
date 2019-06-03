import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) {}

  createAccount(email, password, username, status){
    const data = {email, password, username, status};
    this.http.post('http://localhost', data);
  }

}
