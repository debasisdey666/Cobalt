import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { WeeklyTimetableService } from 'src/app/services/weekly-timetable.service';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-weekly-timetable',
  templateUrl: './weekly-timetable.component.html',
  styleUrls: ['./weekly-timetable.component.css']
})
export class WeeklyTimetableComponent implements OnInit {

  constructor(
    private serviceData2: BranchService,
    private serviceData3: AcademicYearService,
    private serviceData4: SemesterService,
    private serviceData5: WeeklyTimetableService,
  ) { }

  showBranchData:any;
  showBranch:any;
  showACData:any;
  showAcademicYearTrue:any;
  showSemesterTrue:any;
  showSem:any;
  showwktimetable:any;
  showwktmtabl:any;
  showwktmtabl2:any;

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
    })

    this.serviceData5.showWeekTimetabl().subscribe((data)=>{
      this.showwktimetable = data;
      this.showwktmtabl =this.showwktimetable['WeeklyTimeTableSchedularView'][0].WeeklyTimeTable;
      console.log("this.showwktimetable");
      console.log(this.showwktmtabl);
    })

  }


  // Pagination
  
  pageSize =10;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }


  calculateRowspan(weekdayName: string): number {
    let count = 0;
    for (const item of this.showwktmtabl) {
      if (item.WEEKDAY_NAME === weekdayName) {
        count++;
      }
    }
    return count;
  }

  searchWeeklytimetable(data:any){
    
  }

  editBtn(showWkTm:any, event:Event){

  }

}
