import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../service/product.service";
import {SiteService} from "../service/site.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements  OnInit , AfterViewInit{
  public  sites : any;
  public displayedColumns = ['id','name','address','phoneNumber','email','action'];
  public dataSource : any;


  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private http:HttpClient , private  siteService:SiteService) {

  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.siteService.getSites().subscribe({
      next: value => {
        this.sites =value;
        this.dataSource = new MatTableDataSource(this.sites);
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

}
