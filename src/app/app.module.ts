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
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {MatInputModule} from "@angular/material/input";
import { FournisseurComponent } from './fournisseur/fournisseur.component';

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


@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    CustomerComponent,
    PaymentComponent,
    ProductComponent,
    DashboardComponent,
    FournisseurComponent,


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
    MatInputModule

  ],
  /*providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }
