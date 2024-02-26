import { Component, OnInit } from '@angular/core';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import { AttendanceEntryService } from 'src/app/services/attendance-entry.service';

@Component({
  selector: 'app-attendence-entry',
  templateUrl: './attendence-entry.component.html',
  styleUrls: ['./attendence-entry.component.css']
})
export class AttendenceEntryComponent implements OnInit {
    

    constructor(private serviceData:AttendanceEntryService) { }

    classTime_date: any;
    classTime_id: any;
    classTime_paper: any;
    showAttendanceAll: any;
    showAtted: any;
  
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
  
    pageSize =6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }

    editBtn(showAtt:any,event:Event){
      console.log(showAtt.ID)
    }

}
