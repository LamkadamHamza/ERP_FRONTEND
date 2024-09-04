import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../service/core.service";
import { DatePipe } from '@angular/common';
import {StatusOrder} from "../model/order.model";
import {Customer, GenreCustomer} from "../model/customer.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  providers: [DatePipe , MatSnackBar ]
})
export class AddCustomerComponent implements OnInit , AfterViewInit{

  custForm!: FormGroup;
  GenreCustomer : string[]=[];

  public  customers : any;
  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private _dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private datePipe: DatePipe,
    private _coreService: CoreService
               ) { }



  ngOnInit(): void {


    for (let elt in GenreCustomer){
      let value = GenreCustomer[elt];

      if(typeof  value === 'number'){
        this.GenreCustomer.push(elt);
      }

    }

    this.custForm = this.fb.group({

       id : this.fb.control(''),
      firstname: this.fb.control(''),
      lastname : this.fb.control(''),
      email : this.fb.control(''),
      genre : this.fb.control(''),
      dateNaissance : this.fb.control(''),



    });




  }









  onFormSubmit() {

    let datel = new Date(this.custForm.value.dateNaissance);
    // Format date to yyyy-MM-dd
    let formaN = datel.getFullYear() + '-' + (datel.getMonth() + 1).toString().padStart(2, '0') + '-' + datel.getDate().toString().padStart(2, '0');
    let formData = {
      id:this.custForm.value.id,
      dateNaissance: formaN,
      firstname: this.custForm.value.firstname,
      lastname: this.custForm.value.lastname,
      email: this.custForm.value.email,
      genre: this.custForm.value.genre
    };


    this.customerService.addCustomer(formData).subscribe({
      next : value => {
        this._coreService.openSnackBar('Customer added successfully');
        this._dialogRef.close(true);

      },
      error : err => {
        console.log('Error Status:', err.status);
        console.log('Error Message:', err.message);
        console.log('Error Body:', err.error);

      }
    });

  }

  ngAfterViewInit(): void {
  }

  refreshCustomerList() {
    this.customerService.getCustomer().subscribe({
      next: value => {
        this.customers = value;
        this.dataSource = new MatTableDataSource(this.customers);
      },
      error: err => {
        console.log(err);
      }
    });
  }




}
