import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpRequest,HttpHeaders } from '@angular/common/http';
import {Product} from "../model/product.model";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { httpFactory } from '@angular/http/src/http_module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSellService {

   constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:9000/api/product';

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  saveProduct3(product: Product) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
  // return this.http.post(this.baseUrl+"/api/tasks/save",formdata).map(response=>response.json());
  // return this.http.post(this.baseUrl+"/save?pic1="+pic1+"&pic2="+pic2+"&pic3="+pic3+"&pic4="+pic4,product);
  return this.http.post(this.baseUrl+"/save?",product);
 
    // var request = new XMLHttpRequest();
    // request.open('POST', this.baseUrl+"/save",true);
    // return request.send(formdata);
  // return this.http.post(this.baseUrl+"/save",product,this.options);
    //return this.http.post("/save",product);
  }

  saveProduct1(product: Product) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');  
  // return this.http.post(this.baseUrl+"/api/tasks/save",formdata).map(response=>response.json());
  // return this.http.post(this.baseUrl+"/save?pic1="+pic1+"&pic2="+pic2+"&pic3="+pic3+"&pic4="+pic4,product);
  return this.http.post(this.baseUrl+"/save?",product);
  }

  saveProduct2(product: Product) {
    console.log(product); 
  // return this.http.post(this.baseUrl+"/save?pic1="+pic1+"&pic2="+pic2+"&pic3="+pic3+"&pic4="+pic4,product);
  return this.http.post(this.baseUrl+"/save?",product);
  }

  
  saveProduct(product: Product,filePic:File) {  
    let formdata: FormData = new FormData(); 
    formdata.append('product',JSON.stringify(product)); 
    formdata.append('file', filePic);
    var request = new XMLHttpRequest();
    request.open('POST', this.baseUrl+"/save",true);
    return request.send(formdata);
  }

  pushFileToStorage(pic1:File) {  
    let formdata: FormData = new FormData();
    formdata.append('pic1', pic1,pic1.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.baseUrl+"/saveImages", formdata);
  }

  pushFilesToStorage2(files:File[]) {  
    let formdata: FormData = new FormData();
    for (var i = 0; i < files.length; i++) { 
      formdata.append("fileUpload", files[i]);
    }
    //formdata.append('pic1', pic1,pic1.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.baseUrl+"/saveImages", formdata);
  }

  pushFilesToStorage(pic1:File,pic2:File,pic3:File,pic4:File,msds:File,coa:File,specificationSheet:File,productId:string) {  
    let formdata: FormData = new FormData();

    pic1!=null?formdata.append('pic1', pic1, pic1.name):formdata.append('pic1', pic1) ;
    pic2!=null?formdata.append('pic2', pic2, pic2.name):formdata.append('pic2', pic2) ;
    pic3!=null?formdata.append('pic3', pic3, pic3.name):formdata.append('pic3', pic3) ;
    pic4!=null?formdata.append('pic4', pic4, pic4.name):formdata.append('pic4', pic4) ;
    msds!=null?formdata.append('msds', msds, msds.name):formdata.append('msds', msds) ;
    coa!=null?formdata.append('coa', coa, coa.name):formdata.append('coa', coa) ;
    specificationSheet!=null?formdata.append('specificationSheet', specificationSheet, specificationSheet.name):formdata.
    append('specificationSheet', specificationSheet) ;
    formdata.append("productId",productId);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(this.baseUrl+"/saveImages", formdata);
  }
  makeFileRequestWorkingWithNoResponse(product: Product,filePic:File) {
    //return Observable.fromPromise(new Promise((resolve, reject) => {
      var observableFromPromise = fromPromise(new Promise((resolve, reject) => {
  //  return new Promise((resolve, reject) => {
        let formdata: any = new FormData();
        formdata.append('product',JSON.stringify(product)); 
        //formdata.append('file', filePic);
        let xhr = new XMLHttpRequest()
        // for(let file of files) {
        //     formData.append("uploads[]", file, file.name)
        // }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open('POST', this.baseUrl+"/save",true);
        xhr.send(formdata);
    }));
    return observableFromPromise;
}

}
