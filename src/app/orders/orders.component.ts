import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {OrdersService} from "../service/orders.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit , AfterViewInit{

  public  orders : any;
  public displayedColumns = ['id','dateCreation','dateLivrision','status','idProduct','idSite','idCustomer','action'];
  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private orderService: OrdersService, private route: Router) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.orderService.getOrders().subscribe({
      next: value => {
        this.orders =value;
        this.dataSource = new MatTableDataSource(this.orders);
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

  newOrder() {
this.route.navigateByUrl("/admin/new-orders")
  }
}
