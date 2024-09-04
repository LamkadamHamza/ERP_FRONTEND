import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../service/product.service";
import {Product} from "../model/product.model";
import {AddCustomerComponent} from "../add-customer/add-customer.component";
import {CustomerService} from "../service/customer.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AddProductComponent} from "../add-product/add-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , AfterViewInit{

  public  products : any;
  public displayedColumns = ['prodcint','productType','productNature','productEtat','name','price','action'];
  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private http:HttpClient ,
              private  productService:ProductService ,
              private _dialog: MatDialog,
              private route: Router) {


  }

  ngAfterViewInit(): void {

    }
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: value => {
        this.products =value;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    })



  }

  Filterchange(data:Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter =value;
  }





  handleDelet(product: Product) {
    if(confirm("Etes vous sûre?"))
      this.productService.deleteProduct(product).subscribe({
        next:value => {
          this.removeProductFromDataSource(product.id);
        },
        error: err => {
          console.error('Error deleting product:', err);
        }
      })
  }


  removeProductFromDataSource(productId: number): void {
    this.products = this.products.filter((product: { id: number; }) => product.id !== productId);
    this.dataSource.data = this.products; // Update the data source
  }

  openAddProductForm() {
    const dialogRef = this._dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.refreshProductList();
        }
      },
    });
  }



  refreshProductList() {
    this.productService.getProducts().subscribe({
      next: value => {
        this.products = value;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;

      },
      error: err => {
        console.log(err);
      }
    });

  }
}
