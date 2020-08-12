
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpEventType,HttpResponse } from '@angular/common/http';
import {ProductSellService} from "../service/product-sell.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-images-add',
  templateUrl: './images-add.component.html',
  styleUrls: ['./images-add.component.css']
})
export class ImagesAddComponent implements OnInit {
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

  constructor(private http:HttpClient,private productSellService: ProductSellService,
    private formBuilder: FormBuilder,private router: Router) { }

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

 

 addProductForm: FormGroup;
 addImagesForm: FormGroup;
  ngOnInit() {     
this.addProductForm = this.formBuilder.group({
productId: ['', Validators.required],
pic1: [null, Validators.required],
pic2:[null,],
pic3: [null,],
pic4: [null,],
coa: [null,Validators.required],
specificationSheet: [null,],
msds: [null,]
  });
}


onSubmit2() {
  this.productSellService.saveProduct1(this.addProductForm.value)
 .subscribe( data => {
      console.log("data from addProductForm is :"+data);
      if(data==false){
        alert("Data could not be saved, please try again");
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

onSubmit3() {
  this.myFiles.push(this.pic1);
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

 onSubmit() {
  this.productSellService.pushFilesToStorage(this.pic1,this.pic2,this.pic3,this.pic4,this.coa,this.msds,this.specificationSheet,)
  .subscribe(
               res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; 
                       alert("Data and Images saved successfully");
                    },
               err => {console.log('Error Occured during saving: ' + err);
               alert('Error Occured during saving: ' + err.error.message);} 
            );
 }



  onFileSelected(event:any,controlName:String,file:File)
  {
    const max_size = 1048576;
    const allowed_types = ['image/png', 'image/jpeg'];
    const max_height = 15200;
    const max_width = 25600;

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

