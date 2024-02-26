import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ClassTimeTableService } from 'src/app/services/class-time-table.service';
import { PaperService } from 'src/app/services/paper.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util'; 

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
    ) { }

    startTime: string = '';
    endTime: string = '';
    START_TIME: any;
    END_TIME: any;
    

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


    endTimeLessThanStartTime(): boolean {
      if (this.START_TIME && this.END_TIME) {
        const startTime = new Date(`2000-01-01T${this.START_TIME}`);
        const endTime = new Date(`2000-01-01T${this.END_TIME}`);
        return startTime >= endTime;
      }
      return false;
    }

    endTimeLessThanStartTime2(): boolean {
      const startTime = new Date(`2000-01-01T${this.classTimUpdate.START_TIME}`);
      const endTime = new Date(`2000-01-01T${this.classTimUpdate.END_TIME}`);
  
      if (this.classTimUpdate.START_TIME && this.classTimUpdate.END_TIME) {
        return startTime >= endTime;
      }
  
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
