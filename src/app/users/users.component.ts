import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { NgAnalyzedModules } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any;
  message="";
  createMessage="";
  userData:any="";
  constructor(private usersService:UsersService,
    private router:Router,
    private route:ActivatedRoute,
    private storageService:StorageService) { }
  
  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
    this.usersService.viewAllUsers().subscribe((res:any)=>{
      console.log("response fetched for user component.ts oninit viewallusers:"+res);
      if(res.status==="Success"){
        this.users=res.users;
        this.message="Below is the list of all the users available:"
      }
      else{
        this.users="";
        this.message=res.message;
      }
       console.log(this.message);
    },err=>{
      if(err.status!=0)
      this.message=err.error.message;
      else
      this.message="Error while processing request"
    })
    console.log(this.users);
  }

  onEdit(userId){
    this.router.navigate(["edit/"+userId],{relativeTo:this.route});
  }

  onDelete(userId){
    console.log(userId);
    this.usersService.deleteUser(userId).subscribe((res:any)=>{
      console.log(res);
      if(res.status==="Success"){
        this.ngOnInit();
        this.createMessage=res.message;
      }
      else{
        this.createMessage=res.message;
      }
    },err=>{
      if(err.status!=0)
      this.createMessage=err.error.message;
      else
      this.createMessage="Error while processing request"
    });
  }

  onAdd(){
    this.router.navigate(['add'],{relativeTo:this.route});
  }
}
