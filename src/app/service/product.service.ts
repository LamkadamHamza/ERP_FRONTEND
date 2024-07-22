import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Product} from "../model/product.model";
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host : string ="http://192.168.56.1:8082";
  constructor(private http: HttpClient) { }

  public deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${this.host}/api/products/${product.id}`).pipe(
      catchError(this.handleError)
    );
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/api/products`).pipe(
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
