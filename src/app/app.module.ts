import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import{MDBBootstrapModule} from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ListUserDtlComponent } from './user/userDtl/list-userDtl/list-userDtl.component';
import { Routes,RouterModule } from '@angular/router';
import {AddUserDtlComponent} from './user/userDtl/add-userDtl/add-userDtl.component';
import {EditUserDtlComponent} from './user/userDtl/edit-userDtl/edit-userDtl.component';
import { UserDtlService } from './service/userDtl.service';
import { HttpClientModule,HttpClient  } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { StatusComponent } from './status/status.component';
import { NegotiationComponent } from './negotiation/negotiation.component';
import { ProductSellComponent } from './product-sell/product-sell.component';
import { CartComponent } from './cart/cart.component';
import { AddMessageComponent } from './message/add-message/add-message.component';
import { ListMessageComponent } from './message/list-message/list-message.component';
import { UserComponent } from './user/user/user.component';
import { SelfComponent } from './self/self.component';
import { ProductSellService } from './service/product-sell.service';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';

//import { DropdownDirective } from './shared/dropdown.directive';
//import { AddUserAdministrationComponent } from './add-user-administration/add-user-administration.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        ListUserDtlComponent,
        AddUserDtlComponent,
        EditUserDtlComponent,
        ProductListComponent,
        StatusComponent,
        NegotiationComponent,
        ProductSellComponent,
        CartComponent,
        AddMessageComponent,
        ListMessageComponent,
        UserComponent,
        SelfComponent,
        HomeComponent,
      //  DropdownDirective
     //   AddUserAdministrationComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule  
       // MDBBootstapModule.forRoot()
    ],
 //   schemas:[NO_ERRORS_SCHEMA],
    providers: [UserDtlService,ProductSellService],
    bootstrap: [AppComponent]
})
export class AppModule { }
