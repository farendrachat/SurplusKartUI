import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder,ValidatorFn} from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { TransactionService } from '../services/transaction.service';
import { CartService } from '../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'; 
import {States} from "../../enum/states.enum";
import { StorageService } from '../services/storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionForm:FormGroup;
  message="";
  prId:any;
  action:any;
  userData:any;
 // unitPrice:any;
  //buyPacketQty:any;  
  estimatedPrice:any;

  // arrCategory = environment.categoryList;
  quantityExpressUnit = environment.quantityExpressUnit;
  // states : string[] = (Object.keys(States)).slice(Object.keys(States).length / 2);

  MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
    const buyQty = fg.get('buyPacketQty').value;
    const availableQty = fg.get('availablePackets').value;
    return buyQty !== null && availableQty !== null && availableQty > buyQty
      ? null
      : { range: true };
  };

  constructor(
    private productService:ProductsService,
    private transactionService:TransactionService,
    private cartService:CartService,    
    private router:Router,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private storageService:StorageService,
    private location: Location
  ) { }

  ngOnInit(): void { 
  //  this.estimatedPrice = this.unitPrice * this.buyPacketQty;
  
    this.userData=this.storageService.getUserData();
    this.transactionForm = this.formBuilder.group({
      name: [null, [Validators.required,Validators.maxLength(50)]],
      brand: [null,[Validators.maxLength(50)]],
      packSize: [null, [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5)]],
      availablePackets: [null, [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
      qtyExpressed: [null, [Validators.required]],
      unitPrice: [null,  [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
      buyPacketQty:[null, Validators.required], 
      estimatedPrice:[null,Validators.required],
      prId:[null,],
      sellerId:[null,],
      buyerId:[null,]
      },
      { validator: this.MyAwesomeRangeValidator});

      this.prId = this.route.snapshot.params['id'];
      this.action = this.route.snapshot.params['action'];
     
      if (this.prId && this.action=='buy') {
        this.productService.getProduct(this.prId).subscribe((res: any) => {
          if (res.status === "Success") {
           // this.transactionForm.disable();
          //  this.transactionForm.get('buyPacketQty').enable();
            this.transactionForm.patchValue(res.product)
          }
        })
      }
      if (this.prId && this.action=='addToCart') {
        this.productService.getProduct(this.prId).subscribe((res: any) => {
          if (res.status === "Success") {
           // this.transactionForm.disable();
          //  this.transactionForm.get('buyPacketQty').enable();
            this.transactionForm.patchValue(res.product)
          }
        })
      }
     
      if (this.prId && this.action=='view') {
        this.productService.getProduct(this.prId).subscribe((res: any) => {
          if (res.status === "Success") {
            this.transactionForm.disable();
            this.transactionForm.patchValue(res.product)
          }
        })
      }
  }

  updateEstimatePrice(buyQty:any){
    
   // this.transactionForm.get('estimatedPrice').setValue(buyQty * this.transactionForm.get('unitPrice').value);
    this.estimatedPrice=(buyQty * this.transactionForm.get('unitPrice').value * 
    this.transactionForm.get('packSize').value);
    this.transactionForm.patchValue({ estimatedPrice: this.estimatedPrice}, 
         { emitEvent: false });

    // control.valueChanges.subscribe(e => {
    //   control.setValue(e, {emitEvent: false});
  }
  

  buyTransaction(){
   this.transactionForm.get("buyerId").setValue(this.userData.userId);
   this.transactionService.buy(this.transactionForm.value).subscribe((res: any) => {
    if (res.status === "Success")
    {
      alert("Record Saved Successfully");
      this.router.navigate(["./../../../buyer"], { relativeTo: this.route })
    }
    else
      this.message = res.message;
  }, err => {
    this.message = "Error while proccessing request, try after sometime"
  });  
}

addToCart(){
  this.transactionForm.get("buyerId").setValue(this.userData.userId);
  this.cartService.addToCart(this.transactionForm.value).subscribe((res: any) => {
   if (res.status === "Success")
   {
     alert("Item added to Cart");
     this.router.navigate(["./../../../buyer"], { relativeTo: this.route })
   }
   else
     this.message = res.message;
 }, err => {
   this.message = "Error while proccessing request, try after sometime"
 });  
}

  // buyTransaction(){
  //   this.transactionForm.get('buyerId').setValue(this.userData.userId); 
  //   this.transactionService.buyTransaction(this.transactionForm.value).subscribe((res: any) => {
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
    this.transactionForm.reset();
    // this.transactionForm.get('price').setValue("0");
    // this.transactionForm.get('quantity').setValue(0);
  
  }



}
