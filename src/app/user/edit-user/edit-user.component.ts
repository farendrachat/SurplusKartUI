import { Component, OnInit } from '@angular/core';
import {UserDtlService} from "../../service/userDtl.service";
import {Router} from "@angular/router";
import {UserDtl} from "../../model/userDtl.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: UserDtl;
  
  constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserDtlService) { }
  editForm: FormGroup;
  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    // this.userService.getUserById(+userId)
    //   .subscribe( data => {
    //     this.editForm.setValue(data);
    //   });
  }

   onSubmit() {
  //   this.userService.updateUser(this.editForm.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.router.navigate(['list-user']);
  //       },
  //       error => {
  //         alert(error);
  //       });
   }
}