import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductSellComponent} from "./product-sell/product-sell.component";
import {AddMessageComponent} from "./message/add-message/add-message.component";
import {ListMessageComponent} from "./message/list-message/list-message.component";
import {NegotiationComponent} from "./negotiation/negotiation.component";
import {CartComponent} from "./cart/cart.component";
import {SelfComponent} from "./self/self.component";
import {StatusComponent} from "./status/status.component";
import {AddUserDtlComponent} from "./user/userDtl/add-userDtl/add-userDtl.component";
import {ListUserDtlComponent} from "./user/userDtl/list-userDtl/list-userDtl.component";
import {EditUserDtlComponent} from "./user/userDtl/edit-userDtl/edit-userDtl.component";
import {UserComponent} from "./user/user/user.component";
import {HomeComponent} from "./home/home.component";
import {ImagesAddComponent} from "./images-add/images-add.component"
import { NgModule } from '@angular/core';

const routes: Routes = [ 
  { path: 'buy', component: ProductListComponent },
  { path: 'sell', component: ProductSellComponent },
  { path: 'add-images', component: ImagesAddComponent },
  { path: 'addMessage', component: AddMessageComponent },
  { path: 'home', component: HomeComponent}, 
  { path: 'negotiate', component: NegotiationComponent },
  { path: 'user',component: UserComponent, children:[
  { path: 'add-userDtl', component: AddUserDtlComponent },
  { path: 'edit-userDtl', component: EditUserDtlComponent },
  { path: 'list-userDtl', component: ListUserDtlComponent }, 
  ] },   
  { path: 'self', component: SelfComponent,children:[
    { path: 'cart', component: CartComponent },
    { path: 'status', component: StatusComponent }, 
    { path: 'listMessage', component: ListMessageComponent},
  ]},
 
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}