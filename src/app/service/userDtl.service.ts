import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Http } from '@angular/http';
import {UserDtl} from "../model/userDtl.model";
import 'rxjs/Rx';
// import { Component } from "@angular/core";
// import {Observable} from 'rxjs';

@Injectable()
export class UserDtlService {

  
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:9000/api/userdtls';
  //baseUrl: string = 'http://localhost:8080/';

  getUsers() {
    return this.http.get<UserDtl[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<UserDtl>(this.baseUrl + '/' + id);
  }

  createUser(user: UserDtl) {
    console.log(user);
    //return this.http.post(this.baseUrl+"/api/tasks/save",user).map(response=>response.json());
    return this.http.post(this.baseUrl+"/save",user);
  }

  updateUser(user: UserDtl) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(userDtlsId: String) {
    return this.http.delete(this.baseUrl + "/delete" + '/' + userDtlsId);
  }
}
