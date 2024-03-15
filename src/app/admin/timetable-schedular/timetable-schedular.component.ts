import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgForm} from '@angular/forms';
import { TimetableSchedularService } from '../../services/timetable-schedular.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { BranchService } from 'src/app/services/branch.service';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-timetable-schedular',
  templateUrl: './timetable-schedular.component.html',
  styleUrls: ['./timetable-schedular.component.css']
})
export class TimetableSchedularComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('addTimetableform') addTimetableform!: NgForm;
  @ViewChild('editTimetableform') editTimetableform!: NgForm;

  showTimeSChedularAll:any;
  showTimeSChedular:any;
  showTimSchedular:any;
  fromdate:any;
  todate:any;
  aycode:any;
  showACData:any;
  showAcademicYearTrue:any;
  showBranchData:any;
  showBranch:any;
  showSemesterTrue:any;
  showSem:any;
  buttonDisabled: boolean = false;  
  isSubmit=false;  
  addSuccessmessage:boolean = false;
  loading:boolean = false;
  updateSuccessmessage:boolean = false;

  constructor(
    private serviceData : TimetableSchedularService,
    private serviceData3:AcademicYearService,
    private serviceData4:BranchService,
    private serviceData5:SemesterService,
  ) { }

  ngOnInit(): void {
    this.serviceData.showTimetableSchedular().subscribe((data)=>{
      this.showTimeSChedularAll = data
      this.showTimeSChedular = this.showTimeSChedularAll['Data']
      console.log("Time Table Schedular");
      console.log(data);
      console.log(this.showTimeSChedular[0].ID);
    })

    this.serviceData3.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })

    this.serviceData4.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })

    this.serviceData5.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem =  this.showSemesterTrue['Data'];
      console.log(this.showSem);
    })


  }

  // Pagination
  
  pageSize =6;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }


  addTimetableformdata(data:any){
    this.loading = true;
    this.addSuccessmessage = false;
    this.serviceData.addTimetableSchedular(data).subscribe((resp:any)=>{
      this.addSuccessmessage = true;
      this.loading = false;
      console.log(resp);
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.addTimetableform.resetForm();
      }, 1000); 
     this.ngOnInit()
    })
  }


   // edit Data

   timeSchdulrUpdate = {
    ID:"",
    AYCODE:"",
    AY:"",
    BRANCH_ID:"",
    BRANCH_NAME:"",
    SEM_NAME:"",
    SEM:"",
    FROMDATE:"",
    TODATE:"",
    GENERATE_STATUS:"",
  }

  editBtn(showTimSchedular: any, event: Event) {    
    this.timeSchdulrUpdate = JSON.parse(JSON.stringify(showTimSchedular));
    console.log(this.timeSchdulrUpdate.ID)
    console.log(this.timeSchdulrUpdate.ID)
    console.log(this.timeSchdulrUpdate.TODATE)
  }

  editTimetableformdata(data:any){
    this.loading = true;
    this.serviceData.editTimetableSchedular(data).subscribe((resp)=>{
      this.updateSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.updateSuccessmessage = false;
        this.closeButton2.nativeElement.click();
         this.editTimetableform.resetForm();
      }, 1000); 
      this.ngOnInit(); 
    })
  }


// active / deactive Data

actvinactv(showTimSchedular:any,event:Event){
  this.timeSchdulrUpdate= showTimSchedular;
}

statusTimetableformData(){
  this.loading = true;
  this.serviceData.statusTimetableSchedular(this.timeSchdulrUpdate).subscribe((resp)=>{
    console.log('');
    console.log(resp);
    this.updateSuccessmessage = true;
    this.loading = false;
    setTimeout(() => {
      this.updateSuccessmessage = false;
      this.closeButton3.nativeElement.click();
    }, 1000); 
    this.ngOnInit(); 
  })
}

generateBtn(data:any){
  console.log();
}


toDateInvalid: boolean = false;

validateDateRange() {
  if (this.fromdate && this.todate) {
    const fromDate = new Date(this.fromdate);
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

}



   