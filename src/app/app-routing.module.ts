import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { ImagesComponent } from './images/images.component';
import { BuyerComponent } from './buyer/buyer.component';
import { ImageShowComponent } from './image-show/image-show.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SellerTransactionsComponent } from './seller-transactions/seller-transactions.component';


const routes:Routes=[
  {path:'', redirectTo:"login",pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,children:[
    {path:'',component:DashboardComponent},
    {path:'users',component:UsersComponent},
    {path:'users/add',component:UserComponent},
    {path:'users/edit/:id',component:UserComponent},
    {path:'products',component:ProductsComponent},
    {path:'products/add',component:ProductComponent},
    {path:'products/edit/:id',component:ProductComponent},
    {path:'products/images/:id',component:ImagesComponent},
    // {path:'buyer/images/:id',component:ImagesComponent},
    {path:'products/edit/:id/:action',component:ProductComponent},
    {path:'buyer/edit/:id/:action',component:ProductComponent},
    {path:'buyer/view/:id/:action',component:ProductComponent},
    {path:'buyer',component:BuyerComponent},
    {path:'buyer/image-show/:id/:action',component:ImageShowComponent},
    {path:'transactions',component:TransactionsComponent},
    {path:'transaction/:id/:action',component:TransactionComponent},
    {path:'sellerTransactions',component:SellerTransactionsComponent},

  ]},
  {path:'**',redirectTo:"login"}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
