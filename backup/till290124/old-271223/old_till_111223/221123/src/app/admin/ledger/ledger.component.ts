import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {

  showldgr:any;
  showLedger: any;  
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  

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
      // this.isSubmit=true;
      this.serviceData.addledger(data).subscribe((result)=>{
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
    this.isSubmit=true;
    this.serviceData.editLedger(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log(data);
    })  
  }


    // active / deactive Data

    actvinactv(showldgr: any, event: Event) {
      this.ladgerUpdate = showldgr;
      console.log(showldgr.ID);
    }

    ledgerstatusFormData() {
      this.serviceData.statuspaytyp(this.ladgerUpdate).subscribe(
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
