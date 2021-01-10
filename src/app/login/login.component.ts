import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  userData:{username:string,password:string};
  loginResult:any="";
  showLoginError=false;
  message="Unable to connect to the server";

  constructor(private loginService:LoginService,private router:Router,private storageService:StorageService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      'username':new FormControl(null,Validators.required),
      'password':new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    this.userData={
      'username':this.loginForm.get('username').value.trim(),
      'password':this.loginForm.get('password').value
    }
   this.loginService.login(this.userData).subscribe(res=>{
    this.loginResult=res;
    if(this.loginResult.status==="Success"){
      this.router.navigate(['/home']);      
      this.storageService.setUserData({
        'userName':this.loginResult.userName,
        'role':this.loginResult.role,
        'userId':this.loginResult.userId
      });
    }
    else{
      this.showLoginError=true;
      this.message=this.loginResult.message;
    }},err=>{
      console.log(err);
      this.showLoginError=true;
      if(err.status!=0)
      this.message=err.error.message;
    });
    
  }
}
