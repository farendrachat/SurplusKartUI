import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL="http://localhost:9000/api/security/";

@Injectable()
export class LoginService{

  

    constructor(private httpClient:HttpClient){   
    }

    login(userData:any){
        console.log(userData);
        return this.httpClient.post(BASE_URL+"login",userData);
       
    }
}