import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const BASE_URL="http://localhost:9000/api/transaction/";

@Injectable()
export class TransactionService {
  constructor(private httpClient:HttpClient) { }

  buyTransaction(buyData:any){
    return this.httpClient.post(BASE_URL+"buyTransaction",buyData);
}
}
