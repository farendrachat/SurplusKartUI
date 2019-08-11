import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserDtlService} from "../../service/userDtl.service";
import {UserDtl} from "../../model/userDtl.model";

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit {

  users: UserDtl[];

  constructor(private router: Router, private userService: UserDtlService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  deleteUser(user: UserDtl): void {
    this.userService.deleteUser(user.userDtlId)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: UserDtl): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
}
