import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";
import {UserProfile} from "../model/user.profile";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {


  private _keycloak : Keycloak | undefined ;
  private _profile : UserProfile | undefined ;


  get keycloak(){

    if(!this._keycloak){
     this._keycloak = new Keycloak({
       url: 'http://localhost:9999',
       realm: 'ERP_V1',
       clientId: 'ERP_client_ang_v1'
     });
    }
    return this._keycloak;
  }



  get profile(): UserProfile | undefined {
    return  this._profile;
  }
  constructor() { }


  async  init(){
    console.log('Authentication the user ...')
    const authenticated = await this.keycloak.init({
   onLoad :'login-required',
    });


    if(authenticated){
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile ;
       this._profile.token = this.keycloak?.token!;
    }
  }


  login(){
    return this._keycloak?.login();
  }

  logout(redirectUri: string) {
    return this._keycloak?.logout({ redirectUri });
  }
}
