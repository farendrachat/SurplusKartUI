import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-seller-transactions',
  templateUrl: './seller-transactions.component.html',
  styleUrls: ['./seller-transactions.component.css']
})
export class SellerTransactionsComponent implements OnInit {

  transactions: any;
  message = "";
  p: number = 1;
  userData:any;
  createMessage="";
  action:any;

  constructor(private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService:StorageService) { }

  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
    this.transactionService.viewSellerTransactions(this.userData.userId).subscribe((res: any) => {
     if (res.status === "Success") {
        this.transactions = res.transactions;
        this.message = "Below is the list of all the transactions available:"
      }
      else {
        this.transactions = "";
        this.message = res.message;
      }
      console.log(this.message);
    }, err => {
      if (err.status != 0)
        this.transactions = err.error.message;
      else
        this.message = "Error while processing request"
    })

  }

}

