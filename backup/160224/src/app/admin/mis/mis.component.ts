import { Component, OnInit } from '@angular/core';
import { MisService } from '../../services/mis.service';
import { environment } from '../../../environments/environment';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';


@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {

  selectedMISReport: string = '0'; // Default value for the select
  fmdate: string = ''; // Property to bind to the From Date input
  todate: string = ''; // Property to bind to the To Date input
  toDateInvalid: boolean = false; // Flag to indicate if the To Date is invalid
  addSuccessmessage: boolean = false; // Flag to indicate if the To Date is invalid
  buttonDisabled: boolean = false;
  showStudentH:any;
  showStuHistory:any;
  showBranchData:any;
  showBranch:any;
  showACData:any;
  showAcademicYearTrue:any;
  showSemesterTrue:any;
  showSem:any;
  linkurl: string =environment.baseUrl;
  updateSuccessmessage: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private serviceData:MisService,
    private serviceData2: BranchService,
    private serviceData3: AcademicYearService,
    private serviceData4: SemesterService,
  ) { }

  ngOnInit(): void {
    

    this.serviceData2.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch = this.showBranchData['Data'];
    })

    this.serviceData3.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })

    this.serviceData4.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem = this.showSemesterTrue['Data'];
      //console.log(this.showSem);
    })

  }



  // Method to handle form submission
  searchMisInput(formData: any) {

    this.errorMessage = false;  
    this.showStuHistory =[];
    console.log('Form submitted!');
    this.serviceData.showStudentHistory(formData).subscribe((data) => {    

      this.showStudentH = data;
      this.showStuHistory =  this.showStudentH['Student_Details_Year_Wise'];


      if(this.showStuHistory.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showStuHistory =[];
        console.log("no data");
        this.errorMessage = true;  
      }
   


    })
  }

   
    validateDateRange() {
      if (this.fmdate && this.todate) {
        const fromDate = new Date(this.fmdate);
        const toDate = new Date(this.todate);
        this.toDateInvalid = toDate.getTime() < fromDate.getTime();
        if (this.toDateInvalid) {
          alert("To date must be greater than from date");
          this.buttonDisabled = true; // Disable the button
        } else {
          this.buttonDisabled = false; // Enable the button
        }
      }
    }



    // Pagination

    pageSize =6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }



}
