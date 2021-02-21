import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const BASE_URL="http://localhost:9000/api/transaction/";

@Injectable()
export class TransactionService {
  constructor(private httpClient:HttpClient) { }

  buy(buyData:any){
    return this.httpClient.post(BASE_URL+"buy",buyData);
}

// viewSellerTransactions(sellerId:any){
//   return this.httpClient.get(BASE_URL+"getSellerTransactions/"+sellerId);
// }

viewUserTransactions(user:any){
  if(user.role==='BUYER')
  return this.httpClient.get(BASE_URL+"getBuyerTransactions/"+user.userId);
  if(user.role==='SELLER')
  return this.httpClient.get(BASE_URL+"getSellerTransactions/"+user.userId);
  if(user.role==='ADMIN')
  return this.viewAllTransactions();

}

viewAllTransactions(){
  return this.httpClient.get(BASE_URL+"getAllTransactions");
}

changeTransactionStatus(transaction:any){
  return this.httpClient.post(BASE_URL+"changeTransactionStatus",transaction);
}
}
