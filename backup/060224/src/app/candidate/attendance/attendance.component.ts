import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import { PaperService } from '../../services/paper.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit { 

  constructor(
    private serviceData: AttendanceService,    
    private serviceData2: PaperService,
    ) { }

  showStuAttend:any;
  showAttendnc:any;
  filterSearchData:any;
  showPaper:any;
  showpr:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  addErrormessage: boolean = false;
  loading: boolean = false;

  pageOfItems: any[] = []; // Assuming pageOfItems is an array of objects

  // Define a variable to store the count
  countStatusCodeOne: number = 0;
  countStatusCodeOne2: number = 0;
  countStatusCodeOne3: number = 0;
  

  ngOnInit(): void {
    this.serviceData.showAttendanceStudnt().subscribe((data) => {
      this.showAttendnc = data;
      this.showStuAttend = this.showAttendnc['ATTENDANCE_DETAILS'];
      console.log("Student Attendance");
      console.log(this.showStuAttend);


      this.countStatusCodeOne = this.showStuAttend.filter((item: any) => item.ATTENDANCE_STATUSCODE == 1).length;
      console.log("Count of ATTENDANCE_STATUSCODE equal to 1:", this.countStatusCodeOne);

      this.countStatusCodeOne2 = this.showStuAttend.filter((item: any) => item.ATTENDANCE_STATUSCODE == 0).length;
      console.log("Count of ATTENDANCE_STATUSCODE equal to 0:", this.countStatusCodeOne2);

      this.countStatusCodeOne3 = this.showStuAttend.filter((item: any) => item.ATTENDANCE_STATUSCODE == 3).length;
      console.log("Count of ATTENDANCE_STATUSCODE equal to 0:", this.countStatusCodeOne3);

    }) 
    this.serviceData2.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
      console.log("this.showpr");
      console.log(this.showpr);
    })  
    
   
  }

   // Pagination

   pageSize = 4;
   items = [];
  //  pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     // update current page of items
     this.pageOfItems = pageOfItems;
   }




   selectedPaperId: number = 0; 
   selectedSem: number = 0; 


   selectedMonth: string = '';

   months: string[] = [
     'JANUARY,2024', 'FEBRUARY,2024', 'MARCH,2024', 'APRIL,2024', 'MAY,2024', 'JUNE,2024',
     'JULY,2024', 'AUGUST,2024', 'SEPTEMBER,2024', 'OCTOBER,2024', 'NOVEMBER,2024', 'DECEMBER,2024'
   ];


   onMonthChange(event: any) {
    console.log('Selected Month:', this.selectedMonth);
    // Additional logic using event if needed
  }


  // resetForm() {
  //  this.selectedPaperId = null;
  //   this.selectedMonth = null; // or any default value
  
  //   // Use NgForm directive to reset the form
  //   this.searchStudentAtt.resetForm();
  // }



   searchStuatt() {

    // const CURRENT_SEM = getFromLocalStorage('CURRENT_SEM');
    const userId = getFromLocalStorage('userId');
    const studenId = getFromLocalStorage('studenId');

    const data = {      
        "useR_ID": userId,
        "reporT_TYPE":1,
        "instructoR_ID": 18,
        "studenT_ID": studenId,
        "clasS_OF_DATE_START": "2024-01-05",
        "clasS_OF_DATE_END": "2024-01-05",
        "clasS_OF_DATE_MONTH": this.selectedMonth,
        "papeR_ID": this.selectedPaperId,      
    };
  
    // this.serviceData.showMarks(data).subscribe((response) => {
    //   this.showMarksData = response;
    //   this.showMarksInp = this.showMarksData['Data'];
    //   console.log("this.showMarksInp");
    //   console.log(this.showMarksInp);
    // });

    
      this.serviceData.filterSearch(data).subscribe((response) => {
        this.showStuAttend = [];
        this.addErrormessage = true;  
        this.filterSearchData = response;
        this.showStuAttend = this.filterSearchData['ATTENDANCE_FILTER'];
        console.log("this.showStuAttend");
        console.log(this.showStuAttend);
        this.addErrormessage = false;  

        console.log(this.showStuAttend.length);

        if(this.showStuAttend.length > 0){
          console.log("data");
          this.addErrormessage = false;  
        }
        else if(this.showStuAttend.length < 1){
          console.log("data");
          this.addErrormessage = true;  
        }
      });
  }



  

 

   
}
