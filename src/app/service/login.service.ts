import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/userLogin.model';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
               constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:9000/api/user/login';

  getUser(email:String,mobile:String, password: String,role:String) {
    return this.http.get<boolean>(this.baseUrl + '?email=' + email + '&mobile=' + mobile + '&password=' + password + '&role=' + role);
  }

  // getUser(user:UserLogin) {
  //   //return this.http.post<Observable<boolean>>(this.baseUrl,user);    
  //   return this.http.get<boolean>(this.baseUrl,user);      
  // }


}
