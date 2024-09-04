import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {CustomerComponent} from "./customer/customer.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductComponent} from "./product/product.component";
import {PaymentComponent} from "./payment/payment.component";
import {AuthGuard} from "./guards/auth.guard";
import {FournisseurComponent} from "./fournisseur/fournisseur.component";
import {SiteComponent} from "./site/site.component";
import {OrdersComponent} from "./orders/orders.component";
import {NewOrdersComponent} from "./new-orders/new-orders.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {UpdateFournisseurComponent} from "./update-fournisseur/update-fournisseur.component";



const routes: Routes = [
  {path:"" , component: AdminTemplateComponent   },
  {path:"admin" , component: AdminTemplateComponent , children:[
      {path:"dashboard", component:DashboardComponent},
      {path:"customer", component:CustomerComponent /*, canActivate:[AuthGuard] , data :{roles :['ADMIN']}*/},
      {path:"product", component:ProductComponent /*, canActivate:[AuthGuard] , data :{roles :['ADMIN']}*/ },
      {path:"payment", component:PaymentComponent},
      {path:"fournisseur", component:FournisseurComponent},
      {path:"site", component:SiteComponent},
      {path:"orders", component:OrdersComponent},
      {path:"new-orders", component:NewOrdersComponent},
      {path:"update-customer/:id", component:UpdateCustomerComponent},
      {path: "update-four/:id" , component:UpdateFournisseurComponent}

    ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
