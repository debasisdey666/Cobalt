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
  ) { }

  showBranchData:any;
  showBranch:any;
  showACData:any;
  showAcademicYearTrue:any;
  showSemesterTrue:any;
  showSem:any;

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

  }

  searchWeeklytimetable(data:any){
    
  }

}
