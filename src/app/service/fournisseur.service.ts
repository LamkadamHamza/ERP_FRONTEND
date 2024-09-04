import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {Fournisseur} from "../model/fournisseur.model";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private host : string ="http://192.168.56.1:8085";
  constructor(private http: HttpClient) { }

  public getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.host}/api/fournisseurs`).pipe(
      catchError(this.handleError)
    );
  }



  public deleteFournisseur(fournisseur: Fournisseur): Observable<void> {
    return this.http.delete<void>(`${this.host}/api/fournisseurs/${fournisseur.fourncodeint}`).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
