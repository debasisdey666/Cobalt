import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeesService } from '../../services/fees.service';
import { CollegeService } from '../../services/college.service';
import { BranchService } from '../../services/branch.service';
import { SemesterService } from '../../services/semester.service';
import { PaymentTypeService } from '../../services/payment-type.service';
import { AcademicYearService } from '../../services/academic-year.service';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  constructor(
    private serviceData:FeesService,
    private serviceData2:PaymentTypeService,
  ) { }


  shoeFeesS:any;
  showFS:any; 
  showPTData:any; 
  showpaymntyp:any; 
  shoeFeesSearch:any; 
  showFSearch:any; 
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;

  ngOnInit(): void {
    this.serviceData.showStudentDetails().subscribe((data)=>{
      this.shoeFeesS = data;
      this.showFS =  this.shoeFeesS['Data'];
      console.log('this.showFeesStrc');
      console.log(this.showFS);
    }) 


    this.serviceData2.showpaymentType().subscribe((data) => {
      this.showPTData = data;
      this.showpaymntyp = this.showPTData['Data'];
      console.log("this.showpaymntyp");
      console.log(this.showpaymntyp);
    })
  }


    // search Data
    searchPaymntTypedata(data: any) {    
      this.isSubmit = true;
      this.serviceData.showFeess(data).subscribe((data)=>{
      this.shoeFeesSearch = data;
      this.showFSearch =  this.shoeFeesSearch['Data'];
      console.log('this.showFeesStrc');
      console.log(this.showFSearch);
    }) 
    }


  feesUpdate = {
    "ID":0,
    "COLLEGE_ID": 0,
    "COLLEGE_NAME": "",
    "BRANCH_ID": 0,
    "BRANCH_NAME": "",
    "CATEGORY_ID": 0,
    "CATEGORY_NAME": "",
    "AY_ID": "",
    "AY": "",
    "SEM_ID": 0,
    "SEM_NAME": "",
    "PAYMENT_TYPE_ID":"",
    "PAYMENT_TYPE_NAME":"",
    "PAYMENT_AMOUNT": 0,
    "TOTAL_AMOUNT_PAID": 0,
    "PAYMENT_STATUS": "",
    "PAYMENT_DATE": "",
    "AMOUNT": 0,

  }
  selectedOption: string = 'option1';
  inputValue1: string = '';
  inputValue2: string = '';


  calculateDifference() {
    return this.feesUpdate.PAYMENT_AMOUNT - this.feesUpdate.TOTAL_AMOUNT_PAID;
  }
  isAmountValid() {
    return this.feesUpdate.AMOUNT <= this.calculateDifference();
  }
  
  

  editBtn(searchfee:any,event:Event){
    this.feesUpdate= JSON.parse(JSON.stringify(searchfee));
    console.log(searchfee.COLLEGE_ID)
    console.log(searchfee.ID)
  }

  getFeeSFormdata(data:any){
    this.isSubmit = true;
    this.serviceData.addFees(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
      }, 500);  
      console.log(data);
    });
  }

}
