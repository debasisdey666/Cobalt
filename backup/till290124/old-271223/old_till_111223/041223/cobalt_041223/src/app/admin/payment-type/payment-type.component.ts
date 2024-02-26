import { Component, OnInit } from '@angular/core';
import { PaymentTypeService } from '../../services/payment-type.service';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.css']
})
export class PaymentTypeComponent implements OnInit {

  showPaymentType: any;
  showpaymntyp: any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;

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
    // this.isSubmit=true;
    this.serviceData.addpaymentType(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log("data");
      console.log(data);
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
    this.isSubmit=true;
    this.serviceData.editpaymentType(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log(data);
    })  
  }



  // active / deactive Data

  actvinactv(showpaytp: any, event: Event) {
    this.paymenttypeUpdate = showpaytp;
    console.log(showpaytp.ID);
  }

  paymentTypeeFormData() {

    this.serviceData.statuspaytyp(this.paymenttypeUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        setTimeout(function () {
          window.location.reload();
        }, 500);
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
