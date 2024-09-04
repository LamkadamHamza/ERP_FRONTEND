import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../model/product.model";
import {Orders} from "../model/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private host : string ="http://192.168.56.1:8088";

  constructor(private http: HttpClient) { }



  public getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.host}/api/orders`).pipe(
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

  public saveOrder(formData: any):Observable<Orders>{

    return this.http.post<Orders>(`${this.host}/api/orders`,formData);

  }


}
