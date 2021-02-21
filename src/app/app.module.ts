import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './services/login.service';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { UsersService } from './services/users.service';
import { StorageService } from './services/storage.service';
import { UserComponent } from './user/user.component';
import { ProductsService } from './services/products.service';
import { ProductComponent } from './product/product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ImagesComponent } from './images/images.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ImageShowComponent } from './image-show/image-show.component';
import { TransactionService } from './services/transaction.service';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SellerTransactionsComponent } from './seller-transactions/seller-transactions.component';
import { CartComponent } from './cart/cart.component';
import { AdminTransactionsComponent } from './admin-transactions/admin-transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    UserComponent,
    ProductComponent,
    ImagesComponent,
    BuyerComponent,
    ImageShowComponent,
    TransactionComponent,
    TransactionsComponent,
    SellerTransactionsComponent,
    CartComponent,
    AdminTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [UsersService,ProductsService,StorageService,TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
