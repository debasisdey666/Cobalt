import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MisService } from '../../services/mis.service';
import { environment } from '../../../environments/environment';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { Router, NavigationEnd } from '@angular/router';
import { PaperService } from 'src/app/services/paper.service';
import { filter } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
// import DataTable from 'datatables.net-dt';


@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {

  @ViewChild('table') table!: APIDefinition;

  selectedMISReport: string = '0'; // Default value for the select
  fmdate: string = ''; // Property to bind to the From Date input
  todate: string = ''; // Property to bind to the To Date input
  toDateInvalid: boolean = false; // Flag to indicate if the To Date is invalid
  addSuccessmessage: boolean = false; // Flag to indicate if the To Date is invalid
  buttonDisabled: boolean = false;
  showStudentH: any;
  showStuHistory: any;
  showBranchData: any;
  showBranch: any;
  showACData: any;
  showAcademicYearTrue: any;
  showSemesterTrue: any;
  showStudentcountAll: any;
  showFaculAll: any;
  showSem: any;
  showStuFeesall: any;
  showStucntAll: any;
  showFacountAll: any;
  showStudentFees: any;
  showLibraryDf: any;
  showLibraryDfAll: any;
  linkurl: string = environment.baseUrl;
  updateSuccessmessage: boolean = false;
  errorMessage: boolean = false;
  errorMessage3: boolean = false;
  errorMessage2: boolean = false;
  showFeesDf: any;
  showFeesDfAll: any;
  showPaperTrue: any;
  showPaper: any;
  showstudntDf: any;
  showAttdncNw: any;
  swStuatNwRow: any;
  swStuatNw: any;
  swStuatNwCol: any;
  showRankAll: any;
  showRankSgpa: any;
  showRankYgpa: any;
  showRankDgpa: any;
  showBtn: boolean = false;
  showTable: boolean = false;
  searchText: string = "";
  public configuration!: Config;
  public columns!: Columns[];
  public resultStatusConfiguration!: Config;
  public resultStatusColumns!: Columns[];
  showResult = [
    "Passed",
    "Failed",
    "Incompleted"
  ]
  resultStatusData: any;
  showTableForResult: boolean = false;


  public data = [{
    phone: '+1 (934) 551-2224',
    age: 20,
    address: { street: 'North street', number: 12 },
    company: 'ZILLANET',
    name: 'Valentine Webb',
    isActive: false,
  }, {
    phone: '+1 (948) 460-3627',
    age: 31,
    address: { street: 'South street', number: 12 },
    company: 'KNOWLYSIS',
    name: 'Heidi Duncan',
    isActive: true,
  }];


  // Names
  feesCollect: string = "Fees Collection";
  stuCount: string = "Student Count";
  facultyCount: string = "Faculty Count";
  feesDefaulter: string = "Fees Defaulter";
  libraryDefaulter: string = "Library Defaulter";
  studentAttendace: string = "Student Attendance";
  rank: string = "RANK";





  maxDate: string = '';

  constructor(
    private serviceData: MisService,
    private serviceData2: BranchService,
    private serviceData3: AcademicYearService,
    private serviceData4: SemesterService,
    private serviceData5: PaperService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setMaxDate();

    // const currentYear = new Date().getFullYear();
    // const startYear = currentYear - 4;

    // for (let year = startYear; year <= currentYear; year++) {
    //   this.availableYears.push(year);
    // }
  }


  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {

    this.serviceData5.showPaperTrue().subscribe((data) => {
      this.showPaperTrue = data;
      this.showPaper = this.showPaperTrue['Data'];
      //console.log(this.showSem);
    })

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

    this.route.queryParams.subscribe(params => {
      this.selectedMISReport = params['selectedMISReport'] || '0'; // Use default value if parameter is not provided
    });

    // let table = new DataTable('#myTable');
    // this.dtOptions = {
    //   columns: [{
    //     title: 'ID',
    //     data: 'id'
    //   }, {
    //     title: 'First name',
    //     data: 'firstName'
    //   }, {
    //     title: 'Last name',
    //     data: 'lastName'
    //   }]
    // };

    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = false;
    
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
  }


  // ngAfterViewInit(): void {
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       location.reload();
  //     });
  //   this.dtTrigger.next();
  // }

  // Student History

  searchMisInput(formData: any) {

    this.errorMessage = false;
    this.showStuHistory = [];
    console.log('Form submitted!');
    this.serviceData.showStudentHistory(formData).subscribe((data) => {

      this.showStudentH = data;
      this.showStuHistory = this.showStudentH['Student_Details_Year_Wise'];

      console.log("this.showStuHistory");
      console.log(this.showStuHistory);



      if (this.showStuHistory.length > 0) {
        console.log("data");
        this.errorMessage = false;
      }
      else {
        this.showStuHistory = [];
        console.log("no data");
        this.errorMessage = true;
      }

    })
  }



  // getStudentID(showStuHistry: any): void {
  //   console.log("showStuHistry.ID");   
  //   console.log(showStuHistry.ID); 
  //   this.serviceData.student_id = showStuHistry.ID;
  //   alert(this.serviceData.student_id);
  //   this.router.navigateByUrl('/student-history');
  // }

  getStudentID(showStuHistry: any): void {
    console.log("showStuHistry.ID:", showStuHistry.ID);
    console.log(showStuHistry.ID);
    localStorage.setItem('stid', showStuHistry.ID);
    this.router.navigateByUrl('/student-history');
  }


  // Fees Collection

  searchMisFees(formData: any) {

    this.errorMessage2 = false;
    this.showStuFeesall = [];
    this.showBtn = false;
    console.log('Form submitted!');
    this.serviceData.showStudentFeesDetails(formData).subscribe((data) => {

      
      if(data == null){
        this.showBtn = false;
        this.errorMessage2 = true;
      }
      else{
        this.showStudentFees = data;
        this.showStuFeesall = this.showStudentFees['Fees_Collection_Details'];
        console.log(this.showStuFeesall);
        this.showBtn = true;
        this.errorMessage2 = false;
      }
      

    })
  }


  // Student Count

  searchMisStuCount(formData: any) {

    this.errorMessage = false;
    this.showStucntAll = [];
    console.log('Form submitted!');
    this.serviceData.showStudentCnt(formData).subscribe((data) => {

      this.showStudentcountAll = data;
      this.showBtn = true;
      this.showStucntAll = this.showStudentcountAll['STUDENT_COUNT'];
      console.log("student count");
      console.log(this.showStucntAll);


      if (this.showStucntAll.length > 0) {
        console.log("data");
        this.errorMessage = false;
      }
      else {
        this.showStucntAll = [];
        console.log("no data");
        this.errorMessage = true;
      }

      
    },
    (error) => {
      // If an error occurs
      console.error("An error occurred:", error);
      this.showBtn = false; // Hide the button
    })
  }


  // Faculty Count

  searchMisFacultyConut(formData: any) {

    this.errorMessage = false;
    this.showFaculAll = [];
    console.log('Form submitted!');
    this.serviceData.showFacultyCnt(formData).subscribe((data) => {

      this.showStudentcountAll = data;
      this.showBtn = true;
      this.showFaculAll = this.showStudentcountAll['INSTRUCTOR_COUNT'];
      console.log("Faculty count");
      console.log(this.showFaculAll);


      if (this.showStucntAll.length > 0) {
        console.log("data");
        this.errorMessage = false;
      }
      else {
        this.showStucntAll = [];
        console.log("no data");
        this.errorMessage = true;
      }

    })
  }



  // Library Defaulter

  searchLabraryDeaflt(formData: any) {

    this.errorMessage = false;
    this.showLibraryDf = [];
    console.log('Form submitted!');
    this.serviceData.showLibraryDefaulter(formData).subscribe((data) => {

      this.showLibraryDfAll = data;
      this.showBtn = true;
      this.showLibraryDf = this.showLibraryDfAll['LIBRARY_DEFAULTER'];
      console.log("Library Defaulter");
      console.log(this.showLibraryDf);


      if (this.showLibraryDf.length > 0) {
        console.log("data");
        this.errorMessage = false;
      }
      else {
        this.showLibraryDf = [];
        console.log("no data");
        this.errorMessage = true;
      }

    })
  }

  // Fees Defaulter

  searchFeesDeaflt(formData: any) {

    this.errorMessage = false;
    this.showFeesDf = [];
    console.log('Form submitted!');
    this.serviceData.showFeesDefaulter(formData).subscribe((data) => {

      this.showFeesDfAll = data;
      this.showBtn = true;
      this.showFeesDf = this.showFeesDfAll['FEES_DEFAULTER'];
      console.log("Fees Defaulter");
      console.log(this.showFeesDf);


      if (this.showFeesDf.length > 0) {
        console.log("data");
        this.errorMessage = false;
      }
      else {
        this.showFeesDf = [];
        console.log("no data");
        this.errorMessage = true;
      }

    })
  }


  // Student Attendance

  searchStudentAttnDeaflt(formData: any) {

    this.errorMessage2 = false;
    this.swStuatNwRow = [];
    this.swStuatNwCol = [];
    console.log('Form submitted!');

    // this.serviceData.showStudentAttnw(formData).subscribe((data) => { 
    //   this.showstudntDf = data;
    //   this.showBtn = true;
    //   this.showstudntDf =  this.showstudntDf['ATTENDANCE_FILTER_ADMIN'];
    //   console.log("Student Attendance");
    //   console.log(this.showstudntDf);

    this.serviceData.showStudentAttnw(formData).subscribe((data) => {
      this.showAttdncNw = data;
      this.swStuatNwCol = this.showAttdncNw['columns'];
      const arrayOfObjects = this.swStuatNwCol.map((item: any) => ({ key: item, title: item }));
      
      this.columns = arrayOfObjects;
      this.showTable = false;
      this.showTable = true;

      // this.dtOptions = {
      //   destroy: true,
      //   columns: arrayOfObjects,
      //   pagingType: 'full_numbers'
      // };
      // this.dtOptions = {
      //   columns: arrayOfObjects,
      //   pagingType: 'full_numbers'
      // };
      // this.rerender();
      

      // this.updateDiv();

      this.swStuatNwRow = this.showAttdncNw['rows'];
      this.data = this.swStuatNwRow;
      console.log("Attendance Report 1");
      console.log(this.swStuatNwCol);
      console.log(this.swStuatNwRow);
      console.log("Attendance Report 2");
    },
    (error) => {
      // If an error occurs
      console.error("An error occurred:", error);
      this.errorMessage2 = true;
      this.showBtn = false; // Hide the button
    }
    )
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


  // Rank

  reportType:any
  reportTypeValue:any


  onReportTypeChange(value: string) {
    this.reportType = value
    console.log("Selected Report Type: ", value);
     
  }


  searchMisRankData(formData: any) {
    this.errorMessage2 = false;
    this.showBtn = false;
    this.showRankSgpa = [];
    this.showRankYgpa = [];
    this.showRankDgpa = [];
    this.reportTypeValue = this.reportType;
    console.log('Form submitted!');
    this.serviceData.showRank(formData).subscribe((data) => {

      if(data == null){
        this.showBtn = false;
        this.errorMessage2 = true;
      }
      else{
        this.showRankAll = data;
        this.showRankSgpa = this.showRankAll['Student_SGPA_RANKING'];
        this.showRankYgpa = this.showRankAll['Student_YGPA_RANKING'];
        this.showRankDgpa = this.showRankAll['Student_DGPA_RANKING'];
        this.showBtn = true;
        this.errorMessage2 = false;
        console.log("RankAll");
        console.log(this.showRankAll);
      }

      

    })
  }



  // Pagination

  pageSize = 20;
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

  pageOfItems6: Array<any> | undefined;

  onChangePage6(pageOfItems6: Array<any>) {
    this.pageOfItems6 = pageOfItems6;
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

  changeFlag() {
    if (this.showStudentFees != null || this.showStudentcountAll != null || this.showFeesDfAll != null || this.showLibraryDfAll != null || this.showstudntDf != null) {
      this.showBtn = false;
      this.errorMessage2 = false
    }
    else {
      this.showBtn = false;
      this.errorMessage2 = false
    }
  }

  // Result Status
  searchMisResultStatusData(formData: any){
    // // get the student data
    // let studentId = localStorage.getItem('studenId');

    // API to get student pass fail report
    this.serviceData.getResultStatus(formData).subscribe((res: any) => {
      this.resultStatusData = res['STUDENT_PASS_FAIL'];
      this.showTableForResult = true;
    })
  }
  
}
