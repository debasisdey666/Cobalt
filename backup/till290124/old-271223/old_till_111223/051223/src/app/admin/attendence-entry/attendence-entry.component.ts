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
    showAttendanceAll: any;
    showAtted: any;
    addSuccessmessage:boolean=false;
    updateSuccessmessage:boolean=false;    
    isSubmit = false;
  
    ngOnInit(): void {
      // Initialize properties or retrieve values from local storage
      this.classTime_date = getFromLocalStorage('class_time_date');
      this.classTime_id = getFromLocalStorage('class_time_id');
      this.classTime_paper = getFromLocalStorage('class_time_paper');

      this.serviceData.showAttendance().subscribe((data) => {
        this.showAttendanceAll = data;
        this.showAtted =  this.showAttendanceAll['RR']['Data'];

        console.log("this.showAtted");
        console.log(this.showAttendanceAll);
        console.log(this.showAtted);
      })

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

    onCheckboxChange(showAtt: any) {
       showAtt.IS_ATTENDANCE = showAtt.attendance ? 1 : 0;

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
        const checked = event.target.checked;
    
        // Update the state of all checkboxes based on the state of the "Select All" checkbox
        if (this.pageOfItems) {
          this.pageOfItems.forEach(item => {
            if (item) {
              item.attendance = checked;
            }
          });
        }
      }
      selectChanged(event: any, showAtt: any) {
        const checked = event.target.checked;
        showAtt.attendance = checked;
      
        // You can update only the siblings of the clicked checkbox
        if (this.pageOfItems) {
          this.pageOfItems
            .filter(item => item !== showAtt) // Exclude the clicked checkbox from the siblings
            .forEach(item => {
              if (item) {
                item.attendance = false; // Uncheck siblings
              }
            });
        }
      }
      
      


      attendanceFormdata() {        
        
        // Prepare the data to be sent to the API
        const requestData = {
          id: 0,
          timetable_ID: 1,
          student_ID: 0,
          attendancedetail: this.showAtted.map((item: { STUDENT_ID: any; attendance: any; }) => ({
            student_ID: item.STUDENT_ID,
            is_ATTENDANCE: item.attendance ? 1 : 0,
            paper_ID: 3
          })),
          instructor_ID: 4,
          status: true,
          addedby: '1',
          updatedby: '1',
          mode: 'A'
        };
      
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
      
            // Uncomment the following lines if you want to reload the window after 500ms
            setTimeout(() => {
              window.location.reload();
            }, 500);
      
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
