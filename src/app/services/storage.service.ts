
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService{

    userData:{userName:string,role:string, userId:string}={userName:'', role:'', userId:''};

    setUserData(data:any){
        this.userData.userName=data.userName;
        this.userData.role=data.role;
        this.userData.userId=data.userId;
    }

    getUserData(){
        return this.userData;
    }

}

