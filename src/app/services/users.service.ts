import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const BASE_URL="http://localhost:9000/api/user/";

@Injectable()
export class UsersService{

    users=[{
        id:"1",
        name:"Rahul",
        password:"",
        role:"XYZ2",
        department:"ABC2",
        primarySkill:"Java"
    },
    {
        id:"2",
        name:"Rahul",
        password:"",
        role:"XYZ2",
        department:"ABC2",
        primarySkill:"Java"
    },
    {
        id:"3",
        name:"Rahul",
        password:"",
        role:"XYZ3",
        department:"ABC3",
        primarySkill:"Java"
    }];

    constructor(private httpClient:HttpClient){
    }

    viewAllUsers(){
        return this.httpClient.get(BASE_URL+"users");
    }

    addUser(userData){
        return this.httpClient.post(BASE_URL+"save",userData);
    }

    deleteUser(id){
        return this.httpClient.delete(BASE_URL+"deleteUser/"+id);
        //return this.httpClient.delete(BASE_URL+"delete",userId);
    }

    getUser(id:any){
        return this.httpClient.get(BASE_URL+"user/"+id);
    }
    
    updateUser(userData){
        return this.httpClient.put(BASE_URL+"updateUser",userData);
    }

}