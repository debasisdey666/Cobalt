import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ClassTimeTableService } from 'src/app/services/class-time-table.service';
import { PaperService } from 'src/app/services/paper.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util'; 
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-class-time-table',
  templateUrl: './class-time-table.component.html',
  styleUrls: ['./class-time-table.component.css']
})
export class ClassTimeTableComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getClassTimeForm') getClassTimeForm!: NgForm;
  @ViewChild('classTimeFormedit') classTimeFormedit!: NgForm;


  selectedInstructor: string = ''; // assuming the ID is a string, adjust accordingly

  constructor(
    private serviceData:ClassTimeTableService,
    private serviceData2:PaperService,
    private serviceData3:InstructorService,
    private router: Router
    ) { }

    
    // START_TIME: any;
    // END_TIME: any;
    

  linkurl: string =environment.baseUrl;
  showClsTmtbl:any;
  showClsTimtbl:any;
  showPaperAll:any;
  showPaper:any;
  showInstructorAll:any;
  showInstructor:any;
  ROLE_ID:any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  loading: boolean = false;

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Perform actions after route change and page load
        // This code will be executed after each successful route navigation
        location.reload();
      });
  }

  ngOnInit(): void {
    this.serviceData.showClassTimetbl().subscribe((data) => {
      this.showClsTimtbl = data;
      this.showClsTmtbl =  this.showClsTimtbl['Data'];
      console.log("this.showClsTmtbl");
      console.log(this.showClsTmtbl);
    })
    this.serviceData2.showPaperTrue().subscribe((data) => {
      this.showPaperAll = data;
      this.showPaper =  this.showPaperAll['Data'];
      console.log(this.showPaper);
    })

    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    
    
  }

    // Pagination
  
    pageSize =6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }


    startTime: string = '';
    endTime: string = '';

    START_TIME: string = '';

   
  
    // Method 1
  endTimeLessThanStartTime(): boolean {
    if (this.startTime && this.endTime) {
      const commonDate = '2025-01-01T';
      const startTimeString = `${commonDate}${this.startTime}`;
      const endTimeString = `${commonDate}${this.endTime}`;

      const startDate = new Date(startTimeString);
      const endDate = new Date(endTimeString);

      console.log('Start Time:', startTimeString);
      console.log('End Time:', endTimeString);
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);

      return endDate <= startDate;
    }

    console.log('Invalid start or end time');
    return false;
  }

  // Method 2
  endTimeLessThanStartTime2(): boolean {
    if (this.startTime && this.endTime) {
      const commonDate = '2025-01-01T';
      const startTimeString = `${commonDate}${this.startTime}`;
      const endTimeString = `${commonDate}${this.endTime}`;
  
      try {
        // Convert time strings to Date objects
        const startDate2 = new Date(startTimeString);
        const endDate2 = new Date(endTimeString);
  
        console.log('Start Time:', startTimeString);
        console.log('End Time:', endTimeString);
        console.log('Start Date:', startDate2);
        console.log('End Date:', endDate2);
  
        // Check if End Time is greater than or equal to Start Time
        return endDate2 <= startDate2;
      } catch (error) {
        console.error('Error in endTimeLessThanStartTime2:', error);
        return false;
      }
    }
  
    console.error('Invalid start or end time');
    return false;
  }
  
  

   // Add Data
   getClassTimeFormdata(data:any){
    // this.isSubmit=true;
    this.loading = true;
    this.serviceData.addClassTimeTbl(data).subscribe((result)=>{
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getClassTimeForm.resetForm();
      }, 1000);
      this.ngOnInit(); 
      console.log(data);
    })  
  }

  selectedPaper:any;
  showIns:any;
  showInput: boolean = true;

  onChangepaper(event: any): void {
    this.selectedPaper = event.target.value;
    console.log('Selected Paper:', this.selectedPaper);

    this.showInput = false;

    this.serviceData.showInstructorDbtDropBind(this.selectedPaper).subscribe((data) => {
      this.showInstructor = data;
      this.showInstructor =  this.showInstructor['INSTRUCTOR'];
      console.log("this.showIns");
      console.log(this.showInstructor);
    })

  }

      // edit Data

  classTimUpdate = {
    "ID": 0,
    "PAPER_ID": 0,
    "PAPER_NAME": '',
    "INSTRUCTOR_ID": 0,
    "INSTRUCTOR_NAME": '',
    "CLASS_OF_DATE": "",
    "START_TIME": "",
    "END_TIME": "",
    "STATUS": true,
    "ADDEDBY": "",
    "UPDATEDBY": "",
  }

  editBtn(showClsTim:any,event:Event){
    this.classTimUpdate= JSON.parse(JSON.stringify(showClsTim));
    this.classTimUpdate.CLASS_OF_DATE = this.DateString(showClsTim.CLASS_OF_DATE) ?? "";
    console.log(showClsTim.ID)
    console.log(showClsTim.INSTRUCTOR_NAME)
    this.showInput = true;
  }

  attendBtn(showClsTim:any,event:Event){
    this.classTimUpdate= JSON.parse(JSON.stringify(showClsTim));
    this.classTimUpdate.CLASS_OF_DATE = this.DateString(showClsTim.CLASS_OF_DATE) ?? "";
    console.log(showClsTim.ID)
    localStorage.setItem('class_time_date', this.classTimUpdate.CLASS_OF_DATE);
    localStorage.setItem('class_time_id', showClsTim.ID);
    localStorage.setItem('class_time_paper', showClsTim.PAPER_NAME);
    localStorage.setItem('class_time_paper_ID', showClsTim.PAPER_ID);
    localStorage.setItem('class_time_ID', showClsTim.ID);
    localStorage.setItem('class_time_INSTRUCTOR_ID', showClsTim.INSTRUCTOR_ID);
    localStorage.setItem('class_time_INSTRUCTOR_Name', showClsTim.INSTRUCTOR_NAME);
  }

  //Convert Date

DateString(inputdate: Date | undefined): string | undefined {
  if (inputdate) {
    inputdate = new Date(inputdate);
    const _inputdate =
      inputdate.getFullYear().toString() +
      '-' +
      ('0' + (inputdate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + inputdate.getDate().toString()).slice(-2);
    return _inputdate;
  }
  return;
  }

  classTimeFormeditdata(data:any){
    // this.isSubmit=true;
    this.loading = true;
    this.serviceData.editclassTime(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.classTimeFormedit.resetForm();
      }, 1000);
      this.ngOnInit(); 
      console.log("this.showIns");
      console.log(data);
    })  
  }


    // active / deactive Data

    actvinactv(showClsTim:any,event:Event){
      this.classTimUpdate= showClsTim;
      console.log(showClsTim.ID);
    }

    classTimetblStatusFormData() {
      this.loading = true;
      this.serviceData.statusClassTimeTbl(this.classTimUpdate).subscribe(
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
