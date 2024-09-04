import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {CoreService} from "../service/core.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
  providers: [DatePipe , MatSnackBar ]
})
export class UpdateCustomerComponent implements OnInit , AfterViewInit{

  custForm!: FormGroup;
  GenreCustomer : string[]=[];

  customer: any;

  customerCode!: number;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private datePipe: DatePipe,
    private _coreService: CoreService,
    private activetRoute : ActivatedRoute,
    private route: Router

  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {


    this.customerCode = this.activetRoute.snapshot.params['id']

    this.custForm = this.fb.group({

      id : this.fb.control(this.customerCode),
      firstname: this.fb.control(''),
      lastname : this.fb.control(''),
      email : this.fb.control(''),
      genre : this.fb.control(''),
      dateNaissance : this.fb.control(''),



    });


    this.customerService.getCustomerById(this.customerCode).subscribe(customerData => {
      this.customer = customerData;
      this.custForm.patchValue({
        id: this.customer.id,
        firstname: this.customer.firstname,
        lastname: this.customer.lastname,
        email: this.customer.email,
        genre: this.customer.genre,
        dateNaissance: this.datePipe.transform(this.customer.dateNaissance, 'yyyy-MM-dd'), // Formater la date si nécessaire
      });
    });
  }




  updateCustomer(id: number, formData: any): void {
    this.customerService.updateCustomer(id, formData).subscribe({
      next: (updatedCustomer) => {
        console.log('Customer updated successfully', updatedCustomer);
        this._coreService.openSnackBar('Customer updated successfully!', 'OK');
        this.route.navigate(['/admin/customer/']); // Naviguer vers une autre page après la mise à jour
      },
      error: (err) => {
        console.error('Error updating customer', err);
        this._coreService.openSnackBar('Error updating customer', 'OK');
      }
    });
  }
}
