import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const BASE_URL="http://localhost:9000/api/product/";
//const BASE_URL="http://localhost:8080/";

@Injectable()
export class ProductsService{

    products=[{
        id:"1",
        name:"Product1",
        price:10.5,
        quantity:1
    },{
        id:2,
        name:"Product2",
        price:20.5,
        quantity:2
    },{
        id:3,
        name:"Product3",
        price:30.5,
        quantity:3
    }]
    constructor(private httpClient:HttpClient){
    }

    viewAllProducts(){
        return this.httpClient.get(BASE_URL+"products");
    }

    add(productData){
        return this.httpClient.post(BASE_URL+"save",productData);
    }

    deleteProduct(prId){
        return this.httpClient.delete(BASE_URL+"deleteProduct/"+prId);
        //return this.httpClient.delete(BASE_URL+"delete",userId);
    }

    getProduct(prId:any){
        return this.httpClient.get(BASE_URL+"getProduct/"+prId);
    }

    getImages(prId:any){
        return this.httpClient.get(BASE_URL+"getImages/"+prId);
    }

    pushFilesToStorage(pic1:File,pic2:File,pic3:File,pic4:File,msds:File,coa:File,specificationSheet:File,
        productId:any) {  
        let formdata: FormData = new FormData();
    
        pic1!=null?formdata.append('pic1', pic1, pic1.name):formdata.append('pic1', pic1) ;
        pic2!=null?formdata.append('pic2', pic2, pic2.name):formdata.append('pic2', pic2) ;
        pic3!=null?formdata.append('pic3', pic3, pic3.name):formdata.append('pic3', pic3) ;
        pic4!=null?formdata.append('pic4', pic4, pic4.name):formdata.append('pic4', pic4) ;
        msds!=null?formdata.append('msds', msds, msds.name):formdata.append('msds', msds) ;
        coa!=null?formdata.append('coa', coa, coa.name):formdata.append('coa', coa) ;
        specificationSheet!=null?formdata.append('specificationSheet', specificationSheet, specificationSheet.name):formdata.
        append('specificationSheet', specificationSheet) ;
        formdata.append('productId',productId);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        return this.httpClient.post(BASE_URL+"/saveImages", formdata);
      }
}