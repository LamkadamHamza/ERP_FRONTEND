import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {Site} from "../model/site.model";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private host : string ="http://192.168.56.1:8087";
  constructor(private http: HttpClient ) { }

  public getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.host}/api/sites`).pipe(
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
