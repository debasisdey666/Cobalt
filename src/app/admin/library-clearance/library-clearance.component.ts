import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LibraryClearanceService } from '../../services/library-clearance.service';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-library-clearance',
  templateUrl: './library-clearance.component.html',
  styleUrls: ['./library-clearance.component.css']
})
export class LibraryClearanceComponent implements OnInit {
  

  // @ViewChild ( 'searchFiter' ) searchFiter:ElementRef

  // triggerButtonClick() {
  //   this.searchFiter.nativeElement.click();
  // }

  updateSuccessmessage: boolean = false;
  errorMessage: boolean = false;
  errorMessage2: boolean = false;
  showStuHistory:any;
  showStudentH:any;
  showFeesDf:any;
  showFeesDfAll:any;
  showPaperTrue:any;
  showPaper:any;
  showstudntDf:any;
  showBranchData:any;
  showBranch:any;
  showACData:any;
  showAcademicYearTrue:any;
  showSemesterTrue:any;
  showStudentcountAll:any;
  showSem:any;
  checkField: boolean = false;

  constructor(
    private serviceData:LibraryClearanceService,
    private serviceData2: BranchService,
    private serviceData3: AcademicYearService,
    private serviceData4: SemesterService,
    private serviceData5: PaperService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.serviceData5.showPaperTrue().subscribe((data) => {
      this.showPaperTrue = data;
      this.showPaper = this.showPaperTrue['Data'];
      //console.log(this.showSem);
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
      //console.log(this.showSem);
    })

   
  
    this.serviceData.showStudentHisView().subscribe((data) => {
      this.showStudentH = data;
      this.showStuHistory =  this.showStudentH['Student_Details_Year_Wise'];
      if(this.showStuHistory.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showStuHistory =[];
        console.log("no data");
        this.errorMessage = true;  
      }  
    })
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    // !this.checkField
     this.showStuHistory.forEach((item: any) => item.selected = checked);
    // console.log("checked" + checked);
    this.cdr.detectChanges();
  }


  // Pagination

  pageSize =15;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

 // Method to handle form submission
 searchMisInput(formData: any) {

  this.errorMessage = false;  
  this.showStuHistory =[];
  console.log('Form submitted!');

  this.serviceData.showStudentHistory(formData).subscribe((data) => {  

    this.showStudentH = data;
    this.showStuHistory =  this.showStudentH['Student_Details_Year_Wise'];

    console.log("this.showStuHistory");
    console.log(this.showStuHistory);
    


    if(this.showStuHistory.length > 0){      
      console.log("data");
      this.errorMessage = false;  
    }
    else{
      this.showStuHistory =[];
      console.log("no data");
      this.errorMessage = true;  
    }

  })
}
  



}
