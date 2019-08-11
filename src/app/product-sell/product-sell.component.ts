import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType,HttpResponse } from '@angular/common/http';
import {ProductSellService} from "../service/product-sell.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { environment } from '../../environments/environment'; 
import {States} from "../../enum/states.enum";
//import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap';

@Component({
  selector: 'app-product-sell',
  templateUrl: './product-sell.component.html',
  styleUrls: ['./product-sell.component.css']
})
export class ProductSellComponent implements OnInit {
  myFiles:File [] = [];
  pic1:File = null;
  pic2:File = null;
  pic3:File = null;
  pic4:File = null;
  msds:File = null;
  coa:File = null;
  specificationSheet:File = null;

  

  // arrCategory: any [] = [
  //   { name: 'Bells Sparrow' },
  //   { name: 'Mourning Dove'},
  //   { name: 'Bald Eagle' }
  // ];
  arrCategory = environment.categoryList;
  quantityExpressUnit = environment.quantityExpressUnit;
  states : string[] = (Object.keys(States)).slice(Object.keys(States).length / 2);


 // progress: { percentage: number } = { percentage: 0 };

  constructor(private http:HttpClient,private productSellService: ProductSellService,
    private formBuilder: FormBuilder,private router: Router) { }

 // constructor(private formBuilder: FormBuilder,private router: Router, private userService: UserService) { }

 addProductForm: FormGroup;
  ngOnInit() {     

this.addProductForm = this.formBuilder.group({
offerId:[],
sellerId:[],
// product: ['', Validators.required],
name: ['', [Validators.required,Validators.maxLength(50)]],
category: ['', Validators.required],
availableQty: ['', [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
qtyExpressed: ['', [Validators.required]],
unitPrice: ['',  [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
// pic1: [null, Validators.required],
// pic2:[null, Validators.required],
// pic3: [null, Validators.required],
// pic4: [null, Validators.required],
state: ['', Validators.required],
city: ['', [Validators.required,Validators.maxLength(50)]],
brand: ['',[Validators.maxLength(50)]],
dateManufacture: ['', Validators.required],
dateExpire: ['', Validators.required],
packSize: ['', [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]]
// coa: ['', Validators.required],
// specificationSheet: ['', Validators.required],
// msds: ['', Validators.required]
// approved: ['', Validators.required],
// updateOn: ['', Validators.required],
// approvedBy: ['', Validators.required],
// loadedBy: ['', Validators.required]    
  });
}

onSubmit() {
  this.productSellService.saveProduct1(this.addProductForm.value,this.pic1,this.pic2,this.pic3,
    this.pic4,this.msds,this.coa,this.specificationSheet)
 .subscribe( data => {
      console.log("data from addProductForm is :"+data);
      alert("Data saved successfully");
    },
    errorObj => {console.log("fails with error :"+errorObj.error.message);
    alert("Error while saving data :"+errorObj.error.message);
  }

    );
}

  onFileSelected(event,controlName)
  {
    console.log(event);
    console.log(controlName);
    switch(controlName)
    {
      case "pic1":this.pic1 = <File>event.target.files[0];
      break;
      case "pic2":this.pic2 = <File>event.target.files[0];
      break;
      case "pic3":this.pic3 = <File>event.target.files[0];
      break;
      case "pic4":this.pic4 = <File>event.target.files[0];
      break;
      case "coa":this.coa = <File>event.target.files[0];
      break;
      case "specificationSheet":this.specificationSheet = <File>event.target.files[0];
      break;
      case "msds":this.msds = <File>event.target.files[0];
      break;
    }
  }

// onSubmit1() {
//   this.productSellService.
  
  
//   saveProduct(this.addProductForm.value,this.pic1);
//     // .subscribe( data => {
//     //   console.log("data from addProductForm is :"+data);
//     //   alert("Data saved successfully");
//     // });
// }

// onSubmitWorkingWithNoResponse() {
//   this.productSellService.makeFileRequestWorkingWithNoResponse(this.addProductForm.value,this.pic1)
//  // .map(res => res.json())
//   //.map(res => res
//   .map((res: Response) => res.json())
//       .subscribe(        
//          // res => console.log(res),
//          res => alert(res),
//           error => console.log("fails")
//       )
// }



  // save(){    
  //   this.productSellService.pushFileToStorage(this.pic1);

  //   this.progress.percentage = 0;   
  //   this.productSellService.pushFileToStorage(this.pic1).subscribe(event => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       this.progress.percentage = Math.round(100 * event.loaded / event.total);
  //     } else if (event instanceof HttpResponse) {
  //       console.log('File is completely uploaded!');
  //     }
  //   })
 
  //   this.pic1 = undefined
  // }



}
