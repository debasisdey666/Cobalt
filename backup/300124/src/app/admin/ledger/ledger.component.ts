import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getledgerForm') getledgerForm!: NgForm;
  @ViewChild('editLedgerForm') editLedgerForm!: NgForm;

  showldgr:any;
  showLedger: any;  
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  loading: boolean = false;
  

  constructor(private serviceData: LedgerService) { }

  ngOnInit(): void {
    this.serviceData.showledger().subscribe((data) => {
      this.showLedger= data;
      this.showldgr = this.showLedger['Data'];
      console.log(this.showldgr);

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


    getgetledgerFormdata(data:any){
      this.loading = true;
      // this.isSubmit=true;
      this.serviceData.addledger(data).subscribe((result)=>{
        this.addSuccessmessage=true;
        this.loading = false;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton.nativeElement.click();
          this.getledgerForm.resetForm();
        }, 1000); 
        this.ngOnInit(); 
      })  
    }




    // edit Data

  ladgerUpdate = {
    LEDGER_NAME: '',
    status: '',
    ID: '',                
  };

  editBtn(showldgr: any, event: Event) {
    this.ladgerUpdate = JSON.parse(JSON.stringify(showldgr));
    console.log(showldgr.ID);
    console.log(showldgr.STATUS);
  }

  editLedgerFormdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.editLedger(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.editLedgerForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 
    })  
  }


    // active / deactive Data

    actvinactv(showldgr: any, event: Event) {
      this.ladgerUpdate = showldgr;
      console.log(showldgr.ID);
    }

    ledgerstatusFormData() {
      this.loading = true;
      this.serviceData.statuspaytyp(this.ladgerUpdate).subscribe(
        (resp) => {
          console.log(resp);
          this.updateSuccessmessage = true;
          this.loading = false;
          setTimeout(() => {
            this.addSuccessmessage = false;
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
