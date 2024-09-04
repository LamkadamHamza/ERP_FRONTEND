import { Injectable } from '@angular/core';
import {Fournisseur} from "../model/fournisseur.model";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private host : string ="http://192.168.56.1:8081";
  constructor(private http: HttpClient) { }





  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.host}/api/customers`).pipe(
      catchError(this.handleError)
    );
  }


  public deleteCustomer(customer: Customer): Observable<void> {
    return this.http.delete<void>(`${this.host}/api/customers/${customer.id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.host}/api/customers/${id}`);
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



  addCustomer(formData: any): Observable<Customer> {
    return this.http.post<Customer>(`${this.host}/api/customers`, formData );
  }

  updateCustomer(id: number, formData: any): Observable<Customer> {
    return this.http.put<Customer>(`${this.host}/api/customers/${id}`, formData);
  }



}
