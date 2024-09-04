import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {CoreService} from "../service/core.service";
import {MatPaginator} from "@angular/material/paginator";
import {ProductEtat, ProductGestion, ProductNature, ProductType} from "../model/product.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit , AfterViewInit{

  prodForm!: FormGroup;
  ProductType : string[]=[];
  ProductNature : string[]=[];
  ProductEtat : string[]=[];
  ProductGestion : string[]=[];


  public  products : any;
  public dataSource : any;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private _dialogRef: MatDialogRef<AddProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private datePipe: DatePipe,
              private _coreService: CoreService) {
  }

  ngOnInit(): void {

    for (let elt in ProductNature){
      let value = ProductNature[elt];

      if(typeof  value === 'number'){
        this.ProductNature.push(elt);
      }

    }

    for (let elt in ProductType){
      let value = ProductType[elt];

      if(typeof  value === 'number'){
        this.ProductType.push(elt);
      }

    }

    for (let elt in ProductEtat){
      let value = ProductEtat[elt];

      if(typeof  value === 'number'){
        this.ProductEtat.push(elt);
      }

    }
    for (let elt in ProductGestion){
      let value = ProductGestion[elt];

      if(typeof  value === 'number'){
        this.ProductGestion.push(elt);
      }

    }


    this.prodForm = this.fb.group({

      id : this.fb.control(''),
      name: this.fb.control(''),
      PRODCINT : this.fb.control(''),
      productType : this.fb.control(''),
      productNature : this.fb.control(''),
      productEtat : this.fb.control(''),
      price:this.fb.control(''),



    });

  }



  onFormSubmit() {


    let formData = {
      id:this.prodForm.value.id,
      name: this.prodForm.value.name,
      PRODCINT: this.prodForm.value.PRODCINT,
      productType: this.prodForm.value.productType,
      productNature: this.prodForm.value.productNature,
      productEtat: this.prodForm.value.productEtat,
      price: this.prodForm.value.price
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

}
