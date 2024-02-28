import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaymentTypeService } from '../../services/payment-type.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.css']
})
export class PaymentTypeComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getPaymentTypeForm') getPaymentTypeForm!: NgForm;
  @ViewChild('editPaymentTypeForm') editPaymentTypeForm!: NgForm;

  showPaymentType: any;
  showpaymntyp: any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  loading: boolean = false;

  constructor(private serviceData: PaymentTypeService) { }

  ngOnInit(): void {
    this.serviceData.showpaymentType().subscribe((data) => {
      this.showPaymentType = data;
      this.showpaymntyp = this.showPaymentType['Data'];
      console.log(this.showpaymntyp);
    })
  }

   // Pagination

   pageSize = 6;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     // update current page of items
     this.pageOfItems = pageOfItems;
   }


   getPaymentTypeFormdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.addpaymentType(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getPaymentTypeForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 
    })  
  }



  // edit Data

  paymenttypeUpdate = {
    PAYMENT_TYPE_NAME: '',
    status: '',
    ID: '',                
  };

  editBtn(showpaytp: any, event: Event) {
    this.paymenttypeUpdate = JSON.parse(JSON.stringify(showpaytp));
    console.log(showpaytp.PAYMENT_TYPE_NAME);
    console.log(showpaytp.ID);
    console.log(showpaytp.STATUS);
  }

  editPaymentTypeFormdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.editpaymentType(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.editPaymentTypeForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 
    })  
  }



  // active / deactive Data

  actvinactv(showpaytp: any, event: Event) {
    this.paymenttypeUpdate = showpaytp;
    console.log(showpaytp.ID);
  }

  paymentTypeeFormData() {
    this.loading = true;
    this.serviceData.statuspaytyp(this.paymenttypeUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        this.loading = false;
      setTimeout(() => {
        this.updateSuccessmessage = false;
        this.closeButton3.nativeElement.click();
      }, 1000); 
      this.ngOnInit(); 
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
