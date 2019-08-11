import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent,HttpRequest,HttpHeaders } from '@angular/common/http';
import {Product} from "../model/product.model";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable({
  providedIn: 'root'
})
export class ProductSellService {

   constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:9000/api/product';

  saveProduct1(product: Product,pic1:File,pic2:File,pic3:File,pic4:File,
    msds:File,coa:File,specificationSheet:File) {
    console.log(product); 
//this.http.post('your target url', yourBodyObject, this.options);
    // let formdata: FormData = new FormData(); 
    // formdata.append('product',JSON.stringify(product)); 
    // formdata.append('pic1', pic1);
    // formdata.append('pic2', pic2);
    // formdata.append('pic3', pic3);
    // formdata.append('pic4', pic4);
    // formdata.append('msds', msds);
    // formdata.append('coa', coa);
    // formdata.append('specificationSheet', specificationSheet);
  //  const headers = new HttpHeaders();
  //  headers.append('Content-Type', 'multipart/form-data');
  
  // return this.http.post(this.baseUrl+"/api/tasks/save",formdata).map(response=>response.json());
  return this.http.post(this.baseUrl+"/save?pic1="+pic1+"&pic2="+pic2+"&pic3="+pic3+"&pic4="+pic4,product);
    // var request = new XMLHttpRequest();
    // request.open('POST', this.baseUrl+"/save",true);
    // return request.send(formdata);
  // return this.http.post(this.baseUrl+"/save",product,this.options);
    //return this.http.post("/save",product);
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



  saveProduct(product: Product,filePic:File) {  
    let formdata: FormData = new FormData(); 
    formdata.append('product',JSON.stringify(product)); 
    formdata.append('file', filePic);
    var request = new XMLHttpRequest();
    request.open('POST', this.baseUrl+"/save",true);
    return request.send(formdata);
  }

 

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', this.baseUrl+'/saveImage', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  savePic(selectedFile){
    // const fd = new FormData();
    // fd.append("image",selectedFile,selectedFile.name);
    // this.http.post(this.baseUrl+"/save",fd)
    // .subscribe(
    //     res=>{console.log(res);}
    // )
  }
}
