import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit{

  public profile : any;
  constructor(public keycloakService:KeycloakService) {
  }

  ngOnInit(): void {
    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
  }



  async handleLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  handleLogout(){
    this.keycloakService.logout(window.location.origin);
  }

}
