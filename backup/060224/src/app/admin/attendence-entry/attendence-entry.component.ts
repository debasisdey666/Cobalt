import { Component, OnInit } from '@angular/core';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import { AttendanceEntryService } from 'src/app/services/attendance-entry.service';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-attendence-entry',
  templateUrl: './attendence-entry.component.html',
  styleUrls: ['./attendence-entry.component.css']
})
export class AttendenceEntryComponent implements OnInit {
  
    

    constructor(
      private serviceData:AttendanceEntryService,
      private location: Location,
      private cdr: ChangeDetectorRef
      ) { }

    classTime_date: any;
    classTime_id: any;
    classTime_paper: any;
    classTime_paper_ID: any;
    class_time_INSTRUCTOR_ID: any;
    showAttendanceAll: any;
    class_time_INSTRUCTOR_NAME: any;
    STUDENT_REGISTRATION: any;
    showAtted: any;
    ROLE_ID: any;
    addSuccessmessage:boolean=false;
    updateSuccessmessage:boolean=false;    
    isSubmit = false;
    selectAll: boolean = false;
    loading: boolean = false;
  
    ngOnInit(): void {
      // Initialize properties or retrieve values from local storage
      this.classTime_date = getFromLocalStorage('class_time_date');
      this.classTime_id = getFromLocalStorage('class_time_id');
      this.classTime_paper = getFromLocalStorage('class_time_paper');
      this.classTime_paper_ID = getFromLocalStorage('class_time_paper_ID');
      this.class_time_INSTRUCTOR_ID = getFromLocalStorage('class_time_INSTRUCTOR_ID');
      this.class_time_INSTRUCTOR_NAME = getFromLocalStorage('class_time_INSTRUCTOR_Name');

      this.serviceData.showAttendance().subscribe((data) => {
        this.showAttendanceAll = data;
        this.showAtted =  this.showAttendanceAll['RR']['Data'];

        console.log("this.showAtted");
        console.log(this.showAttendanceAll);
        console.log(this.showAtted);
      })

      this.ROLE_ID= getFromLocalStorage('ROLE_ID');
    }

    // Pagination
  
    pageSize =4;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }

    editBtn(showAtt:any,event:Event){
      console.log(showAtt.ID)
    }

    onCheckboxChange(event: any, showAtt: any) {
      showAtt.IS_ATTENDANCE = event.target.checked ? 1 : 0;

      const allChecked = this.pageOfItems?.every(item => item?.attendance) ?? false; // Use false as the default value
      const selectAllCheckbox = document.getElementById('selectall') as HTMLInputElement;
    
      // Check if the element is found before accessing its properties
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
      }
   }

     // Method to go back
      goBack(): void {
        this.location.back();
      }

      selectAllChanged(event: any) {
        console.log('Select All changed:', event.target.checked);
      
        if (this.showAtted) {
          this.showAtted.forEach((item: { IS_ATTENDANCE: any; }) => {
            if (item) {
              item.IS_ATTENDANCE = event.target.checked ? 1 : 0;
            }
          });
      
          // Manually trigger change detection
          this.cdr.detectChanges();
        }
      }

      attendanceFormdata() {        
        const classTime_paper_ID = getFromLocalStorage('class_time_paper_ID');
        const class_time_ID = getFromLocalStorage('class_time_ID');
        const class_time_INSTRUCTOR_ID = getFromLocalStorage('class_time_INSTRUCTOR_ID');
        const userId = getFromLocalStorage('userId');
        // Prepare the data to be sent to the API
        const requestData = {
          id: 0,
          timetable_ID: class_time_ID,
          student_ID: 0,
          attendancedetail: this.showAtted.map((item: any) => ({
            student_ID: item.STUDENT_ID,
            is_ATTENDANCE: item.IS_ATTENDANCE,
            paper_ID: classTime_paper_ID,
          })),
          instructor_ID:class_time_INSTRUCTOR_ID,
          status: true,
          addedby: userId,
          updatedby: userId,
          mode: 'A'
        };
        this.loading = true;
        // Make the API call
        this.serviceData.submitAttendance(requestData).subscribe(
          response => {
            // Handle the API response if needed
      
            // Assuming the response structure includes an `updatedData` property
            if (response.updatedData) {
              this.pageOfItems = response.updatedData;
      
              // Update checkbox state based on IS_ATTENDANCE
              if (this.pageOfItems) {
                this.pageOfItems.forEach(item => {
                  // Ensure item is defined before accessing its properties
                  if (item) {
                    item.attendance = item.IS_ATTENDANCE === 1;
                  }
                });
              }
            }
            this.loading = false;
            // Uncomment the following lines if you want to reload the window after 500ms
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
      
            // Manually trigger change detection if needed
            // this.cdr.detectChanges();
      
            console.log('API Response:', response);
          },
          error => {
            // Handle API error if needed
            console.error('API Error:', error);
          }
        );
      }
      



}
