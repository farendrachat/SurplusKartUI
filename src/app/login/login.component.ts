import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {first} from "rxjs/operators";
import { UserLogin } from '../model/userLogin.model';
import {Role} from "../../enum/role.enum";
//import {AuthenticationService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  roles : string[] = (Object.keys(Role)).slice(Object.keys(Role).length / 2);
  constructor(private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService) { }

  onSubmit(){
    // this.submitted = true;
    this.loginService.getUser(this.loginForm.value.email,this.loginForm.value.mobile,this.loginForm.value.password,
      this.loginForm.value.role)
    .subscribe( isValid => {
      if(isValid)
      {
      alert("Successful login");
        sessionStorage.setItem(
          'token',
          btoa(this.loginForm.value.name + ':' + this.loginForm.value.password)
        );
        this.router.navigate(['./home']);   
      }
      else{
        alert("Please enter valid credentials");
      }
    },
    errorObj => {
    alert("Authentication failed");
  });
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:[null],
      mobile:[null],
      role:['', Validators.required],
      password:['', Validators.required]
        });
    sessionStorage.setItem('token', '');   
  }

  public onLoginClick(){
    this.router.navigate(['./home']);
}
}
