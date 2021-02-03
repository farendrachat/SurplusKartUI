import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const BASE_URL="http://localhost:9000/api/transaction/";

@Injectable()
export class TransactionService {
  constructor(private httpClient:HttpClient) { }

  buy(buyData:any){
    return this.httpClient.post(BASE_URL+"buy",buyData);
}

viewSellerTransactions(sellerId:any){
  return this.httpClient.get(BASE_URL+"getSellerTransactions/"+sellerId);
}

viewBuyerTransactions(buyerId:any){
  return this.httpClient.get(BASE_URL+"getBuyerTransactions/"+buyerId);
}

}
