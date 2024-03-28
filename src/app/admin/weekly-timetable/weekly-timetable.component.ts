import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { WeeklyTimetableService } from 'src/app/services/weekly-timetable.service';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { PaperService } from 'src/app/services/paper.service';
import { InstructorService } from 'src/app/services/instructor.service';

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
    private serviceData6: PaperService,
    private serviceData7: InstructorService,
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
  showPaper:any;
  showPaperData:any;
  showIns:any;
  showInstrucData:any;
  isSubmit:boolean = false;
  errormessage:boolean = false;
  addSuccessmessage:boolean = false;
  loading:boolean = false;
  form!: NgForm; // Define the form property

  ngOnInit(): void {

    this.serviceData7.showInstructor().subscribe((data) => {
      this.showInstrucData = data;
      this.showIns = this.showInstrucData['Data'];   
    })
    this.serviceData6.showPaper().subscribe((data) => {
        this.showPaperData = data;
        this.showPaper = this.showPaperData['Data'];   
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
    })

    this.serviceData5.showWeekTimetabl().subscribe((data)=>{
      this.showwktimetable = data;
      this.showwktmtabl =this.showwktimetable['WeeklyTimeTableSchedularView'][0].WeeklyTimeTable;
      console.log("this.showwktimetable");
      console.log(this.showwktmtabl);
    })

    this.addSet();

  }

  removeSet(index: number) {
    this.formDataSet.splice(index, 1);
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

  wweklytimetableFormdata(form: NgForm){
    this.serviceData5.addWeekTimetabl().subscribe((data)=>{
      console.log(data);
    })
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

formDataSet: any[] = [];

addSet() {
  this.formDataSet.push({
    START_TIME: 0,
    END_TIME: 0,
    PAPER_ID: 0,
    instructoR_ID: 0
  });
  console.log(this.formDataSet); // Add this line
}




}
