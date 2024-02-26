import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { MisService } from '../../services/mis.service';
import { environment } from '../../../environments/environment';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as XLSX from 'xlsx';


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
  showStudentcountAll:any;
  showFaculAll:any;
  showSem:any;
  showStuFeesall:any;
  showStucntAll:any;
  showFacountAll:any;
  showStudentFees:any;
  showLibraryDf:any;
  showLibraryDfAll:any;
  linkurl: string =environment.baseUrl;
  updateSuccessmessage: boolean = false;
  errorMessage: boolean = false;
  showFeesDf:any;
  showFeesDfAll:any;

  maxDate: string = '';

  constructor(
    private serviceData:MisService,
    private serviceData2: BranchService,
    private serviceData3: AcademicYearService,
    private serviceData4: SemesterService,
    private router: Router,
  ) { 
    this.setMaxDate();

    // const currentYear = new Date().getFullYear();
    // const startYear = currentYear - 4;
    
    // for (let year = startYear; year <= currentYear; year++) {
    //   this.availableYears.push(year);
    // }
  }

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


  ngAfterViewInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      // Perform actions after route change and page load
      // This code will be executed after each successful route navigation
      location.reload();
    });
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


  searchMisFees(formData: any) {

    this.errorMessage = false;  
    this.showStuFeesall =[];
    console.log('Form submitted!');
    this.serviceData.showStudentFeesDetails(formData).subscribe((data) => {    

      this.showStudentFees = data;
      this.showStuFeesall =  this.showStudentFees['Fees_Collection_Details'];
      console.log(this.showStuFeesall);


      if(this.showStuFeesall.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showStuFeesall =[];
        console.log("no data");
        this.errorMessage = true;  
      }

    })
  }

  searchMisStuCount(formData: any) {

    this.errorMessage = false;  
    this.showStucntAll =[];
    console.log('Form submitted!');
    this.serviceData.showStudentCnt(formData).subscribe((data) => {    

      this.showStudentcountAll = data;
      this.showStucntAll =  this.showStudentcountAll['STUDENT_COUNT'];
      console.log("student count");
      console.log(this.showStucntAll);


      if(this.showStucntAll.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showStucntAll =[];
        console.log("no data");
        this.errorMessage = true;  
      }

    })
  }


 searchMisFacultyConut(formData: any) {

    this.errorMessage = false;  
    this.showFaculAll =[];
    console.log('Form submitted!');
    this.serviceData.showFacultyCnt(formData).subscribe((data) => {    

      this.showStudentcountAll = data;
      this.showFaculAll =  this.showStudentcountAll['INSTRUCTOR_COUNT'];
      console.log("Faculty count");
      console.log(this.showFaculAll);


      if(this.showStucntAll.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showStucntAll =[];
        console.log("no data");
        this.errorMessage = true;  
      }

    })
  }



  searchLabraryDeaflt(formData: any) {

    this.errorMessage = false;  
    this.showLibraryDf =[];
    console.log('Form submitted!');
    this.serviceData.showLibraryDefaulter(formData).subscribe((data) => {    

      this.showLibraryDfAll = data;
      this.showLibraryDf =  this.showLibraryDfAll['LIBRARY_DEFAULTER'];
      console.log("Library Defaulter");
      console.log(this.showLibraryDf);


      if(this.showLibraryDf.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showLibraryDf =[];
        console.log("no data");
        this.errorMessage = true;  
      }

    })
  }

  searchFeesDeaflt(formData: any) {

    this.errorMessage = false;  
    this.showFeesDf =[];
    console.log('Form submitted!');
    this.serviceData.showFeesDefaulter(formData).subscribe((data) => {    

      this.showFeesDfAll = data;
      this.showFeesDf =  this.showFeesDfAll['FEES_DEFAULTER'];
      console.log("Fees Defaulter");
      console.log(this.showFeesDf);


      if(this.showFeesDf.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showFeesDf =[];
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

    pageSize =20;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }

    pageOfItems2: Array<any> | undefined;
  
    onChangePage2(pageOfItems2: Array<any>) {
      this.pageOfItems2 = pageOfItems2;
    }


    pageOfItems3: Array<any> | undefined;
  
    onChangePage3(pageOfItems3: Array<any>) {
      this.pageOfItems3 = pageOfItems3;
    }

    pageOfItems4: Array<any> | undefined;
  
    onChangePage4(pageOfItems4: Array<any>) {
      this.pageOfItems4 = pageOfItems4;
    }

    pageOfItems5: Array<any> | undefined;
  
    onChangePage5(pageOfItems5: Array<any>) {
      this.pageOfItems5 = pageOfItems5;
    }


    setMaxDate(): void {
      const today = new Date();
      const year = today.getFullYear();
      let month: number | string = today.getMonth() + 1;
      let day: number | string = today.getDate();
  
      // Ensure month and day have two digits
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
  
      this.maxDate = `${year}-${month}-${day}`;
    }



   // filteredItems: any[] = [];

    // exportToExcel(): void {
    //   console.log('Exporting to Excel...');
    //   console.log('Filtered Items:', this.filteredItems);
    
    //   if (this.filteredItems.length > 0) {
    //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredItems);
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    //     try {
    //       // Save the Excel file
    //       XLSX.writeFile(wb, 'student-data.xlsx');
    //       console.log('Excel file saved successfully.');
    //     } catch (error) {
    //       console.error('Error saving Excel file:', error);
    //     }
    //   } else {
    //     console.warn('Filtered Items array is empty. No data to export.');
    //   }
    // }


}
