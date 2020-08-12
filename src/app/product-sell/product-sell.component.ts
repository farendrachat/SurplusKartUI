import { Component, OnInit, Input } from '@angular/core';
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
  imageURL:any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  @Input()
  productId: any = 0;


  arrCategory = environment.categoryList;
  quantityExpressUnit = environment.quantityExpressUnit;
  states : string[] = (Object.keys(States)).slice(Object.keys(States).length / 2);

  constructor(private http:HttpClient,private productSellService: ProductSellService,
    private formBuilder: FormBuilder,private router: Router) { }

    //public selectedFile:any;
    imgURL: any;
    public  onFileChanged(event) {
      console.log(event);
      this.pic1 = event.target.files[0];
  
      // Below part is used to display the selected image
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.imgURL = reader.result;
    };
  }

 

 addProductForm: FormGroup; 
  ngOnInit() {     
this.addProductForm = this.formBuilder.group({
offerId:[],
sellerId:[],
// product: ['', Validators.required],
name: [null, [Validators.required,Validators.maxLength(50)]],
category: [null, Validators.required],
availableQty: [null, [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
qtyExpressed: [null, [Validators.required]],
unitPrice: [null,  [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]],
pic1: [null, Validators.required],
// pic2:[null, Validators.required],
// pic3: [null, Validators.required],
// pic4: [null, Validators.required],
state: [null, Validators.required],
city: [null, [Validators.required,Validators.maxLength(50)]],
brand: [null,[Validators.maxLength(50)]],
dateManufacture: [null, Validators.required],
dateExpire: [null, Validators.required],
packSize: [null, [Validators.required,Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/),Validators.maxLength(5) ]]
// coa: [null, Validators.required],
// specificationSheet: [null, Validators.required],
// msds: [null, Validators.required]
// approved: [null, Validators.required],
// updateOn: [null, Validators.required],
// approvedBy: [null, Validators.required],
// loadedBy: [null, Validators.required]    
  });
}


onSubmit() {
  this.productSellService.saveProduct1(this.addProductForm.value)
 .subscribe( data => {
      console.log("data from addProductForm is :"+data);
      if(data >0){
        this.productId = data;
        alert("Data saved Successfully");
      }
      else{
        this.onSubmit2();
      }
    },
    errorObj => {console.log("fails with error :"+errorObj.error.message);
    alert("Error while saving data :"+errorObj.error.message);
  }
    );
}

onSubmit2() {
  
  // const uploadData = new FormData();
  // uploadData.append('pic1', this.pic1, this.pic1.name);
  this.productSellService.pushFileToStorage(this.pic1)
  .subscribe(
               res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
                       alert("Data and Images saved successfully");
                    },
               err => console.log('Error Occured during saving: ' + err)
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



   
  
  }
  




