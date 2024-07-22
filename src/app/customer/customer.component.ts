import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit , AfterViewInit{
  public  customers : any;
  public displayedColumns = ['id','firstname','lastname','email'];
  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private http:HttpClient) {
  }

  ngAfterViewInit(): void {
        throw new Error('Method not implemented.');
    }
  ngOnInit(): void {


    this.http.get("http://localhost:8081/api/customers").subscribe({
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

}
