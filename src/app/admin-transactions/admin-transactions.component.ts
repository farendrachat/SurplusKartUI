import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { StorageService } from '../services/storage.service';
import { Transaction } from '../model/transaction.model';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.css'],
  providers: [Transaction]
})
export class AdminTransactionsComponent implements OnInit {

  transactions: any;
  message = "";
  p: number = 1;
  userData:any;
  createMessage="";
  action:any;
  //private transaction: Transaction

  constructor(private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService:StorageService,
    private transaction: Transaction
    ) { }

  ngOnInit(): void {
    this.userData=this.storageService.getUserData();
    this.transactionService.viewAllTransactions().subscribe((res: any) => {
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

  updateTransaction(transId:any,transStatus:any){
    this.transaction.transId = transId;
    this.transaction.transStatus = transStatus;
    this.transaction.userName = this.userData.userName;
    this.transaction.isProductApprovedByBuyer = false;
    this.transactionService.changeTransactionStatus(this.transaction).subscribe((res: any) => {
      if (res.status === "Success")
      {
        alert("Transaction Status Updated");
        this.router.navigate(["./../../../sellerTransactions"], { relativeTo: this.route })
      }
      else
        this.message = res.message;
    }, err => {
      this.message = "Error while proccessing request, try after sometime"
    });
  }
}
