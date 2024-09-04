import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CustomerService} from "../service/customer.service";
import {Fournisseur} from "../model/fournisseur.model";
import {Customer} from "../model/customer.model";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AddCustomerComponent} from "../add-customer/add-customer.component";
import {UpdateCustomerComponent} from "../update-customer/update-customer.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit , AfterViewInit{
  public  customers : any;
  public displayedColumns = ['id','First Name','Last Name','Email','genre','dateNaissance','action'];
  public dataSource : any;
  id! : number;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private http:HttpClient ,
              private customerService: CustomerService,
              private _dialog: MatDialog,
              private route: Router) {
  }


  openAddEditCustomerForm() {
    const dialogRef = this._dialog.open(AddCustomerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshCustomerList();
        }
      },
    });
  }

  ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }
  ngOnInit(): void {


    this.customerService.getCustomer().subscribe({
      next: value => {
        this.customers =value;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    })
  }


/*  delete customer */

  handleDelet(customer: Customer) {


    console.log('Deleting customer:', customer); // Add this line to inspect the object

    if (!customer || !customer.id) {
      console.error('Invalid customer object:', customer);
      return;
    }
    if(confirm("Etes vous sûre?"))
      this.customerService.deleteCustomer(customer).subscribe({
        next:value => {
          this.removeCustomerFromDataSource(customer.id);
        },
        error: err => {
          console.error('Error deleting four:', err);
        }
      })
  }



  removeCustomerFromDataSource(CustomerID: number): void {
    this.customers = this.customers.filter((customer: { id: number; }) => customer.id !== CustomerID);
    this.dataSource.data = this.customers; // Update the data source
  }


  Filterchange(data:Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter =value;
  }



/*   modifie Customer */

  handlUpdate(element :Customer) {

    console.log(element.id);
    this.route.navigateByUrl("/admin/update-customer/"+element.id);

  }


  openEditForm(data: any) {

    this.route.navigateByUrl(`/admin/update-customer/${data.id}`);
    const dialogRef = this._dialog.open(UpdateCustomerComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshCustomerList()
        }
      },
    });
  }



  refreshCustomerList() {
    this.customerService.getCustomer().subscribe({
      next: value => {
        this.customers = value;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;

      },
      error: err => {
        console.log(err);
      }
    });

  }


}
