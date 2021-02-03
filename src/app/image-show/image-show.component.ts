
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType,HttpResponse } from '@angular/common/http';
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Location } from '@angular/common';

@Component({
  selector: 'app-image-show',
  templateUrl: './image-show.component.html',
  styleUrls: ['./image-show.component.css']
})
export class ImageShowComponent implements OnInit {
  myFiles:File [] = [];
  pic1:any = null;
  pic2:any = null;
  pic3:any = null;
  pic4:any = null;
  msds:any = null;
  coa:any = null;
  specificationSheet:File = null;
  imageURL:any;
  receivedImageData: any;
  docType :any;
  base64Data: any;
  convertedImage: any;
  prId: any;
  productId: any;
  retrieveResponse: any;
  count:number;
  action:any;

  constructor(private http:HttpClient,private productsService: ProductsService,
    private formBuilder: FormBuilder,private router: Router,private route:ActivatedRoute,
    private location: Location) { }

    //public selectedFile:any;
    imgURL: any;
    public  onFileChanged1(event) {
      console.log(event);
      this.pic1 = event.target.files[0];
  
      // Below part is used to display the selected image
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.imgURL = reader.result;
    };
  }

//   public  onFileChanged(event) {
//     console.log(event);
//     this.myFiles.push = event.target.files[0];
//     // Below part is used to display the selected image
//   //   let reader = new FileReader();
//   //   reader.readAsDataURL(event.target.files[0]);
//   //   reader.onload = (event2) => {
//   //     this.imgURL = reader.result;
//   // };
// }

 

//  addProductForm: FormGroup;
 imagesForm: FormGroup;
  ngOnInit() {     
this.imagesForm = this.formBuilder.group({
productId: [this.prId],
pic1: [null, Validators.required],
pic2:[null,],
pic3: [null,],
pic4: [null,],
coa: [null,Validators.required],
specificationSheet: [null,Validators.required],
msds: [null,Validators.required]
  });

  this.prId = this.route.snapshot.params['id'];
  // if (this.prId && this.action=='buy') {
  //   this.transactionService.buyTransaction(this.prId).subscribe((res: any) => {
  //     if (res.status === "Success") {
  //       this.addProductForm.disable();
  //       this.addProductForm.get('buyPacketQty').enable();
  //       this.addProductForm.get('buyerMessage').enable();
  //       this.addProductForm.patchValue(res.product)
  //     }
  //   })
  // }

  if (this.prId && this.action=='viewDocument') {
    this.productsService.getImages(this.prId).subscribe((res: any) => {
    this.retrieveResponse = res;
    this.imagesForm.disable();
    this.imagesRead(this.retrieveResponse);    
    })
  }

  if (this.prId) {
    this.productsService.getImages(this.prId).subscribe((res: any) => {
    this.retrieveResponse = res;
    this.imagesRead(this.retrieveResponse);
    
    })
  }
}

imagesRead(respo:any){
  
  for(this.count=0;this.count<respo.length;this.count++)
  { 
  switch(respo[this.count].picType)
  {
    case "pic1":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.pic1 = this.docType + this.base64Data;
    break;
    case "pic2":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.pic2 = this.docType + this.base64Data;
    break;
    case "pic3":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.pic3 = this.docType + this.base64Data;
    break;
    case "pic4":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.pic4 = this.docType + this.base64Data;
    break;
    case "coa":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.coa = this.docType + this.base64Data;
    break;
    case "specificationSheet":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.specificationSheet = this.docType + this.base64Data;
    break;
    case "msds":
    this.retrieveResponse = respo[this.count];
    this.docType = 'data:'+this.retrieveResponse.imageType+';base64,';
    this.base64Data = this.retrieveResponse.pic;
    this.msds = this.docType + this.base64Data;
    break;
  }}
}
 onSubmit() {
  this.productsService.pushFilesToStorage(this.pic1,this.pic2,this.pic3,this.pic4,this.coa,this.msds,
    this.specificationSheet,this.prId)
  .subscribe(
               res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
                       alert("Data and Images saved successfully");
                       this.router.navigate(["./.."], { relativeTo: this.route })
                    },
               err => {console.log('Error Occured during saving: ' + err);
               alert('Error Occured during saving: ' + err.error.message);} 
            );
 }

 backHistory(){
  this.location.back();    
}



  // onFileSelected(event:any,controlName:String,file:File)
  onFileSelected(event:any,controlName:String)
  {
    const max_size = 1048576;
    const allowed_types = ['image/png', 'image/jpeg'];
    const max_height = 15200;
    const max_width = 25600;

    if (event.target.files[0].size > max_size) {
        // this.imageError =
        //     'Maximum size allowed is ' + max_size / 1000 + 'Mb';
            alert("File size should be leas then 1 mb");
           event.target.files[0].value = null;
        return false;
    }

    // if (file.type!=allowed_types[0] || file.type!=allowed_types[1]) {
    //     alert('Only Images are allowed ( JPG | PNG )');
    //     return false;
    // }
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
}
