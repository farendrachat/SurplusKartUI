import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const BASE_URL="http://localhost:9000/api/cart/";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  addToCart(cartItemData:any){
    return this.httpClient.post(BASE_URL+"addToCart",cartItemData);
}

  viewCartForBuyer(user:any){
    if(user.role==='BUYER')
    return this.httpClient.get(BASE_URL+"getCartForBuyer/"+user.userId);
    if(user.role==='ADMIN')
    return this.viewAllCartItems();
  }

  checkOutForPayment(buyData:any){
    return this.httpClient.post(BASE_URL+"payment",buyData);
}
deleteItem(cartItem:any){
  alert("delete not implemented");
}

viewAllCartItems(){
  return this.httpClient.get(BASE_URL+"getAllCartItems");
}
}
