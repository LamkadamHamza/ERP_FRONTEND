import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent  implements OnInit,AfterViewInit{


  public  fournisseur : any;
  public dataSource : any;
  public displayedColumns = ['fourncodeint','fourncodeext','fourtype','fourcre','fourutil','fournatu','fourlibl','action'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private  http:HttpClient) {
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.http.get("http://192.168.56.1:8085/api/fournisseurs").subscribe({
      next: value => {
        this.fournisseur =value;
        this.dataSource = new MatTableDataSource(this.fournisseur);
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
