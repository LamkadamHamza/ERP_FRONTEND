import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private host : string ="http://192.168.56.1:8085";
  constructor(private http: HttpClient) { }
}
