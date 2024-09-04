import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {StatusOrder} from "../model/order.model";
import * as events from "events";
import {OrdersService} from "../service/orders.service";

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css'],

})
export class NewOrdersComponent implements OnInit{

  OrderFormGroup! : FormGroup;
  orderStatus : string[]=[];
  pdfFileUrl! : string;
  constructor(private  fb:FormBuilder, private orderService: OrdersService) {
  }

  ngOnInit(): void {

    for (let elt in StatusOrder){
      let value = StatusOrder[elt];

      if(typeof  value === 'number'){
        this.orderStatus.push(elt);
      }

    }

     this.OrderFormGroup = this.fb.group({


      dateLivrision: this.fb.control(''),
      status : this.fb.control(''),
      Contratfile : this.fb.control(''),
      IdCustomer : this.fb.control(''),
      IdProduct : this.fb.control(''),
      IdSite : this.fb.control(''),


    });

  }

  selectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      // Patch the form control with the file name instead of the file object
      this.OrderFormGroup.patchValue({
        Contratfile: file.name  // Set the form control to the file name
      });

      // Create a URL for the file (optional, if you need to preview the PDF)
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }


  saveOrder() {






    let datel = new Date(this.OrderFormGroup.value.dateLivrision);

    // Format date to yyyy-MM-dd
    let formaN = datel.getFullYear() + '-' + (datel.getMonth() + 1).toString().padStart(2, '0') + '-' + datel.getDate().toString().padStart(2, '0');

    let formData :FormData = new  FormData();

    console.log('Date envoyée :', formaN);
    formData.set('dateLivrision', formaN);
    formData.set('status', this.OrderFormGroup.value.status);
    formData.set('IdCustomer', this.OrderFormGroup.value.IdCustomer);
    formData.set('IdProduct', this.OrderFormGroup.value.IdProduct);
    formData.set('IdSite', this.OrderFormGroup.value.IdSite);
    formData.set('Contratfile', this.OrderFormGroup.value.Contratfile);


    this.orderService.saveOrder(formData).subscribe({
         next : value => {

           alert('order saved seccesfully')
         },
      error : err => {console.log(err);

         }
    });
  }
}
