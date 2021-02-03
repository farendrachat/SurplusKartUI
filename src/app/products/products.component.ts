import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  message = "";
  p: number = 1;
  userData:any;
  createMessage="";
  action:any;

  constructor(private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService:StorageService) { }

  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
    this.productsService.viewAllProducts().subscribe((res: any) => {
      console.log(res);
      if (res.status === "Success") {
        this.products = res.products;
        this.message = "Below is the list of all the products available:"
      }
      else {
        this.products = "";
        this.message = res.message;
      }
      console.log(this.message);
    }, err => {
      if (err.status != 0)
        this.products = err.error.message;
      else
        this.message = "Error while processing request"
    })

  }

  onEdit(productId) {
    this.action="edit";
    this.router.navigate(["edit/"+productId+"/"+this.action],{relativeTo:this.route});
  }

  // onView(productId) {
  //   this.action="view";
  //   this.router.navigate(["view/"+productId+"/"+this.action],{relativeTo:this.route});
  // }

  // onBuy(productId) {
  //   this.action="buy";
  //   this.router.navigate(["edit/"+productId+"/"+this.action],{relativeTo:this.route});
  // }

  onBuy(productId) {
    this.action="buy";
    // this.router.navigate(["transaction/"+productId+"/"+this.action],{relativeTo:this.route});
    this.router.navigate(["transaction/"+productId+"/"+this.action]);
  }

  doDocuments(productId) {
    this.router.navigate(["images/"+productId],{relativeTo:this.route});
  }



  onDelete(productId) {
    console.log(productId);
    this.productsService.deleteProduct(productId).subscribe((res:any)=>{
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

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
