
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType,HttpResponse } from '@angular/common/http';
import {ProductsService} from "../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
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
  prId: any;
  productId: any;

  constructor(private http:HttpClient,private productsService: ProductsService,
    private formBuilder: FormBuilder,private router: Router,private route:ActivatedRoute) { }

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

  public  onFileChanged(event) {
    console.log(event);
    this.myFiles.push = event.target.files[0];
    // Below part is used to display the selected image
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (event2) => {
  //     this.imgURL = reader.result;
  // };
}

 

//  addProductForm: FormGroup;
 addImagesForm: FormGroup;
  ngOnInit() {     
this.addImagesForm = this.formBuilder.group({
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
  // if (this.prId && this.action=='edit') {
  //   this.productService.getProduct(this.prId).subscribe((res: any) => {
  //     if (res.status === "Success") {
  //     //  this.userForm.get('name').disable();
  //       this.addProductForm.patchValue(res.product)
  //     }
  //   })
  // }
}
 onSubmit() {
  this.productsService.pushFilesToStorage(this.pic1,this.pic2,this.pic3,this.pic4,this.coa,this.msds,
    this.specificationSheet,this.prId)
  .subscribe((res:any) =>
                {console.log(res);
                if(res.status===true){
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
                       alert("Data and Images saved successfully");
                       //this.router.navigate(["./.."], { relativeTo: this.route })
                    }
                    else{
                      alert("Data could not be saved ");
                    }},
               err => {console.log('Error Occured during saving: ' + err);
               alert('Error Occured during saving: ' + err.error.message);} 
            );
 }




  // onFileSelected(event:any,controlName:String,file:File)
  onFileSelected(event:any,controlName:String)
  {
    const max_size = 1048576;
    const allowed_types = ['image/png', 'image/jpeg'];
    const max_height = 200;
    const max_width = 200;

    if (event.target.files[0].size > max_size) {
        // this.imageError =
        //     'Maximum size allowed is ' + max_size / 1000 + 'Mb';
            alert("File size should be leas then 1 mb");
           // this.pic1=null;
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

