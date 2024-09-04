import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FournisseurService} from "../service/fournisseur.service";
import {Product} from "../model/product.model";
import {Fournisseur} from "../model/fournisseur.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent  implements OnInit,AfterViewInit{


  public  fournisseurs : Fournisseur[]=[];
  public dataSource : any;
  public displayedColumns = ['fourncodeint','fourncodeext','fourtype','fourcre','fourutil','fournatu','fourlibl','action'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private  fournisseurService : FournisseurService , private route:Router) {
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.fournisseurService.getFournisseurs().subscribe({
      next: value => {
        this.fournisseurs =value;
        this.dataSource = new MatTableDataSource(this.fournisseurs);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    })
  }


  handleDelet(fournisseur: Fournisseur) {


    console.log('Deleting fournisseur:', fournisseur); // Add this line to inspect the object

    if (!fournisseur || !fournisseur.fourncodeint) {
      console.error('Invalid fournisseur object:', fournisseur);
      return;
    }
    if(confirm("Etes vous sûre?"))
      this.fournisseurService.deleteFournisseur(fournisseur).subscribe({
        next:value => {
          this.removeFournisseurFromDataSource(fournisseur.fourncodeint);
        },
        error: err => {
          console.error('Error deleting four:', err);
        }
      })
  }




  removeFournisseurFromDataSource(FournisseurID: number): void {
    this.fournisseurs = this.fournisseurs.filter((fournisseur: { fourncodeint: number; }) => fournisseur.fourncodeint !== FournisseurID);
    this.dataSource.data = this.fournisseurs; // Update the data source
  }



  Filterchange(data:Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter =value;
  }


  handlUpdate(element : Fournisseur) {

        console.log(element.fourncodeint);
      this.route.navigateByUrl("/admin/update-four/"+element.fourncodeint);

  }
}
