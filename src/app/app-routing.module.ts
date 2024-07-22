import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {CustomerComponent} from "./customer/customer.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductComponent} from "./product/product.component";
import {PaymentComponent} from "./payment/payment.component";
import {AuthGuard} from "./guards/auth.guard";
import {FournisseurComponent} from "./fournisseur/fournisseur.component";


const routes: Routes = [
  {path:"" , component: AdminTemplateComponent   },
  {path:"admin" , component: AdminTemplateComponent , children:[
      {path:"dashboard", component:DashboardComponent},
      {path:"customer", component:CustomerComponent /*, canActivate:[AuthGuard] , data :{roles :['ADMIN']}*/},
      {path:"product", component:ProductComponent /*, canActivate:[AuthGuard] , data :{roles :['ADMIN']}*/ },
      {path:"payment", component:PaymentComponent},
      {path:"fournisseur", component:FournisseurComponent}
    ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
