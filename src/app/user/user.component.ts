import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Role} from "../../enum/role.enum";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  message = "";
  id;
  arrRoles : string[] = (Object.keys(Role)).slice(Object.keys(Role).length / 2);


  constructor(private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'userName': new FormControl("", [Validators.required,Validators.maxLength(20)]),
      'password': new FormControl('', [Validators.required,Validators.maxLength(50)]),
      'role': new FormControl('', Validators.required),
      'fullName': new FormControl("", [Validators.required,Validators.maxLength(100)]),
      'mobile': new FormControl('', [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(10)]),
      'primaryEmail': new FormControl("", [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),Validators.maxLength(100)]),
      'company': new FormControl("", [Validators.required,Validators.maxLength(50)]),
      'designation': new FormControl("", [Validators.required,Validators.maxLength(50)]),
      'address': new FormControl("", [Validators.required,Validators.maxLength(150)]),
      'city': new FormControl("", [Validators.required,Validators.maxLength(50)]),
      'state': new FormControl("", [Validators.required,Validators.maxLength(50)]),
      'pinCode': new FormControl("", [Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.maxLength(6)])
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.userService.getUser(this.id).subscribe((res: any) => {
        if (res.status === "Success") {
          this.userForm.get('userName').disable();
          this.userForm.patchValue(res.user);
          this.userForm.patchValue(res.user.userDtls)
        }
      })
    }
  }

  onSubmit() {
    console.log(this.userForm.value);

    if (this.id) {
      this.userService.updateUser(this.userForm.getRawValue()).subscribe((res: any) => {
        if (res.status === "Success")
          this.router.navigate(["./../.."], { relativeTo: this.route })
        else
          this.message = res.message;
      }, err => {
        this.message = "Error while proccessing request, try after sometime"
      })

    }
    else {
      this.userService.addUser(this.userForm.value).subscribe((res: any) => {
        if (res.status === "Success")
          this.router.navigate(["./.."], { relativeTo: this.route })
        else
          this.message = res.message;
      }, err => {
        this.message = "Error while proccessing request, try after sometime"
      })

    }
  }

  onReset() {
    this.userForm.reset();
    this.userForm.get('role').setValue("");
  }
}
