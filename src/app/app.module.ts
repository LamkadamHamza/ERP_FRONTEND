import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import { CustomerComponent } from './customer/customer.component';

import {MatCardModule} from "@angular/material/card";
import { PaymentComponent } from './payment/payment.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

import {MatInputModule} from "@angular/material/input";
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { SiteComponent } from './site/site.component';
import { OrdersComponent } from './orders/orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

import { AddCustomerComponent } from './add-customer/add-customer.component';
import {MatDialog, MatDialogModule ,MatDialogRef} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import {KeycloakService} from "./service/keycloak.service";
import {KeycloakAngularModule} from "keycloak-angular";
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { AddProductComponent } from './add-product/add-product.component';

import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import {CardModule} from "primeng/card";



/*function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8087',
        realm: 'ERP_realm_v1',
        clientId: 'ERP_client_ang_v1'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}*/


export function kcFactory(kcService: KeycloakService){
  return () => kcService.init();
}


@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    CustomerComponent,
    PaymentComponent,
    ProductComponent,
    DashboardComponent,
    FournisseurComponent,
    SiteComponent,
    OrdersComponent,
    NewOrdersComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    UpdateFournisseurComponent,
    AddProductComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    KeycloakAngularModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatGridListModule,
    ButtonModule,
    ChartModule,
    CardModule
  ],


  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
