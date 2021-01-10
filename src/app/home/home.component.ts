import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //name="";
  userData:any="";
  constructor(private router:Router,
    private storageService:StorageService) { }

  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
    console.log("Data of users fetched is : ",this.userData);
  }

  onHomeClick(){
    this.router.navigate(['/home']);
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
