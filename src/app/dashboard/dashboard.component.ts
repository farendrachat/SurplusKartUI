import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   userData:any="";

  constructor(private router:Router,
    private route:ActivatedRoute,
    private storageService:StorageService) { }

  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
  }

  onUserClick(){
    this.router.navigate(['users'],{relativeTo:this.route});
  }

  onProductClick(){
    this.router.navigate(['products'],{relativeTo:this.route});
  }

}
