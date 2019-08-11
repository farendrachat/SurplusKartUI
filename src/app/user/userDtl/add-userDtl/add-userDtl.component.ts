import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDtlService} from "../../../service/userDtl.service";
// import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'add-user',
  templateUrl: './add-userDtl.component.html'
})
export class AddUserDtlComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private userDtlService: UserDtlService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      fname: ['', Validators.required],
      mname: [''],
      lname: ['', Validators.required],
      designation: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      company: ['', Validators.required],
      faxNo: [''],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required]
    });

  }

  onSubmit() {
    this.userDtlService.createUser(this.addForm.value)
      .subscribe( data => {
        console.log("data from addForm is :"+data);
        this.router.navigateByUrl('/user/list-userDtl');
      });
  }

}
