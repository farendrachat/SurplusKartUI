import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { TransactionService } from '../services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'; 
import {States} from "../../enum/states.enum";
import { StorageService } from '../services/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //productForm:FormGroup;
  addProductForm:FormGroup;
  message="";
  prId:any;
  action:any;
  userData:any;

  arrCategory = environment.categoryList;
  quantityExpressUnit = environment.quantityExpressUnit;
  states : string[] = (Object.keys(States)).slice(Object.keys(States).length / 2);

  constructor(private productService:ProductsService,
    private transactionService:TransactionService,
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private storageService:StorageService,
    private location: Location) { }

  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
    this.addProductForm = this.formBuilder.group({
      name: [null, [Validators.required,Validators.maxLength(50)]],
      category: [null, Validators.required],
      availableQty: [null, [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
      qtyExpressed: [null, [Validators.required]],
      unitPrice: [null,  [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
      state: [null, Validators.required],
      city: [null, [Validators.required,Validators.maxLength(50)]],
      brand: [null,[Validators.maxLength(50)]],
      dateManufacture: [null, Validators.required],
      dateExpire: [null, Validators.required],  
      buyQuantity:[null, Validators.required], 
      buyerMessage:[null,Validators.required],
      prId:[null,],
      //sellerId:[null,this.userData.userId],
      // buyerId:[null,this.userData.userId],
      packSize: [null, [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5)]]
      });

      this.prId = this.route.snapshot.params['id'];
      this.action = this.route.snapshot.params['action'];
      if (this.prId && this.action=='edit') {
        this.productService.getProduct(this.prId).subscribe((res: any) => {
          if (res.status === "Success") {
          //  this.userForm.get('name').disable();
          this.addProductForm.get('prId').setValue(this.prId);
            this.addProductForm.patchValue(res.product)
          }
        })
      }
      if (this.prId && this.action=='buy') {
        this.transactionService.buyTransaction(this.prId).subscribe((res: any) => {
          if (res.status === "Success") {
            this.addProductForm.disable();
            this.addProductForm.get('buyQuantity').enable();
            this.addProductForm.get('buyerMessage').enable();
            this.addProductForm.patchValue(res.product)
          }
        })
      }
      if (this.prId && this.action=='view') {
        this.productService.getProduct(this.prId).subscribe((res: any) => {
          if (res.status === "Success") {
            this.addProductForm.disable();
            this.addProductForm.patchValue(res.product)
          }
        })
      }
    }
  
    onSubmit(){
      if (this.prId) {
     this.productService.add(this.addProductForm.value).subscribe((res: any) => {
      if (res.status === "Success")
      {
        alert("Record Saved Successfully");
        this.router.navigate(["./../../.."], { relativeTo: this.route })
      }
      else
        this.message = res.message;
    }, err => {
      this.message = "Error while proccessing request, try after sometime"
    });
    }
    else{
      this.productService.add(this.addProductForm.value).subscribe((res: any) => {
        if (res.status === "Success")
          this.router.navigate(["./.."], { relativeTo: this.route })
        else
          this.message = res.message;
      }, err => {
        this.message = "Error while proccessing request, try after sometime"
      });
    }
  }

    // buyTransaction(){
    //   this.addProductForm.get('buyerId').setValue(this.userData.userId); 
    //   this.transactionService.buyTransaction(this.addProductForm.value).subscribe((res: any) => {
    //    if (res.status === "Success")
    //      this.router.navigate(["./.."], { relativeTo: this.route })
    //    else
    //      this.message = res.message;
    //  }, err => {
    //    this.message = "Error while proccessing request, try after sometime"
    //  });
    //  }

    backHistory(){
      this.location.back();    
    }


  
    onReset(){
      this.addProductForm.reset();
      // this.addProductForm.get('price').setValue("0");
      // this.addProductForm.get('quantity').setValue(0);
    
    }
  }

  


