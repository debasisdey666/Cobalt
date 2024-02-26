import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FeesStructureService } from '../../services/fees-structure.service';
import { CollegeService } from '../../services/college.service';
import { BranchService } from '../../services/branch.service';
import { SemesterService } from '../../services/semester.service';
import { PaymentTypeService } from '../../services/payment-type.service';
import { AcademicYearService } from '../../services/academic-year.service';
import { LedgerService } from '../../services/ledger.service';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getFeeStrucForm') getFeeStrucForm!: NgForm;
  @ViewChild('editLedgerForm') editLedgerForm!: NgForm;

  showFeesStrc:any;
  shoeFeesStructure:any;
  showFeesStrcmn:any;
  showCTData:any;
  showCollegeType:any;
  showBranchData:any;
  showBranch:any;
  showSemesterTrue:any;
  showSem:any;
  showPaymentType:any;
  showpaymntyp:any;
  showACData:any;
  showAcademicYear:any;
  LedgerService:any;
  showLdData:any;
  searchFeesStructure:any;
  searchFeesStrc:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  dynamicData: any[] = [];
  loading: boolean = false;

  showLedger: any[] = [
    // Populate this array with your ledger data.
  ];


  resetFormValue() {
    location.reload();
  }

  formDataSet: any[] = [];

  constructor(
    private serviceData:FeesStructureService,
    private serviceData2:CollegeService,
    private serviceData3:BranchService,
    private serviceData4:SemesterService,
    private serviceData5:PaymentTypeService,
    private serviceData6:AcademicYearService,
    private serviceData7:LedgerService,
    ) {

      this.formDataSet = [];
     }

    
    
    
    

     addSet() {
      this.formDataSet.push({
        LEDGER_ID: 0,
        FEES_GEN: 0,
        FEES_SC: 0,
        FEES_ST: 0,
        FEES_OBC: 0,
        FEES_PWD: 0,
        FEES_EWS: 0,
      });
      console.log(this.formDataSet); // Add this line
    }
      
    removeSet(index: number) {
      this.formDataSet.splice(index, 1);
      console.log(this.formDataSet); // Add this line
    }

  ngOnInit(): void {
    this.serviceData.showFeesStruc().subscribe((data)=>{
      this.shoeFeesStructure = data;
      this.showFeesStrc =  this.shoeFeesStructure['Data'];
      console.log('this.showFeesStrc');
      console.log(this.showFeesStrc);
    }) 

    this.serviceData2.showCollegeTypeTrue().subscribe((data) => {
      this.showCTData = data;
      this.showCollegeType =  this.showCTData['Data'];      
    })

    this.serviceData3.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })

    this.serviceData4.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem =  this.showSemesterTrue['Data'];
      console.log(this.showSem);
    })

    this.serviceData5.showpaymentType().subscribe((data) => {
      this.showPaymentType = data;
      this.showpaymntyp = this.showPaymentType['Data'];
      console.log(this.showpaymntyp);
    })

    this.serviceData6.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYear = this.showACData['Data'];
    })

    this.serviceData7.showledger().subscribe((data) => {
      this.showLdData = data;
      this.showLedger = this.showLdData['Data'];     
    })

    this.addSet();
  }

  // Pagination
  
  pageSize =4;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }


  feeStrucUpdate = {
    "ID": 0,
    "COLLEGE_ID": "",
    "COLLEGE_NAME": "",
    "BRANCH_ID": "",
    "BRANCH_NAME": "",
    "AY_ID": "",
    "AY": "",
    "SEM_ID": "",
    "SEM_NAME": "",
    "PAYMENT_TYPE_ID":"",
    "STATUS": "",
    "ViewFeesDetail": [
      {
        "LEDGER_ID": 0,
        "LEDGER_NAME": "",
        "FEES_GEN": 0,
        "FEES_SC": 0,
        "FEES_ST": 0,
        "FEES_OBC": 0,
        "FEES_PWD": 0,
        "FEES_EWS": 0,
      }
      // ... more items
    ]
  }

  editBtn(feest: any, event: Event) {
    this.feeStrucUpdate = JSON.parse(JSON.stringify(feest));
    console.log(feest.ID)
    console.log(feest.LEDGER_ID)
  }

  getFeeStrucFormdata(data: any, formDataSet: any[]) {
    // this.isSubmit = true;
    this.loading = true;
    data.feesdetails = formDataSet;
    console.log(formDataSet); // Add this line
    this.serviceData.addFeesStruc(data, this.formDataSet).subscribe(
      (result) => {
        // Handle success        
        this.formDataSet = []; // Reset dynamic data
        this.addSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton.nativeElement.click();
          this.getFeeStrucForm.resetForm();
        }, 1000); 
        this.ngOnInit(); 
      },
      (error) => {
        console.error('Error:', error);
        this.isSubmit = false; // Reset isSubmit flag
      }
    );
  }


   // search Data
   searchFeeStrucFormdata(data: any) {    
    this.isSubmit = true;
    this.serviceData.SearchFeesStruc(data).subscribe((result) => {
      console.log(result);  
      this.searchFeesStructure = result;
      this.searchFeesStrc = this.searchFeesStructure['Data'];
      console.log('this.showFeesStrc');
      console.log(this.searchFeesStrc);  
    })
  }

// searchFeeStrucFormdata(data: any) {    
//   this.isSubmit = true;
//   this.serviceData.SearchFeesStruc(data).pipe(
//     switchMap(() => this.serviceData.showFeesStruc())
//   ).subscribe((data) => {
//     this.searchFeesStructure = data;
//     this.searchFeesStrc = this.searchFeesStructure['Data'];
//     console.log('this.showFeesStrc');
//     console.log(this.searchFeesStrc);
//   });
// }
  

  
  

  
}
