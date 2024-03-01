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
  // showStuHistory:any;
  showStuHistory: any[] = [];
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
  selectAll: boolean = false;
  addSuccessmessage: boolean = false;
  loading: boolean = false;

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

   
  
    // this.serviceData.showStudentHisView().subscribe((data) => {
    //   this.showStudentH = data;
    //   this.showStuHistory =  this.showStudentH['Student_Details_Year_Wise'];
    //   if(this.showStuHistory.length > 0){      
    //     console.log("data");
    //     this.errorMessage = false;  
    //   }
    //   else{
    //     this.showStuHistory =[];
    //     console.log("no data");
    //     this.errorMessage = true;  
    //   }  
    // })
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

    console.log("student History for library clearance");
    console.log(this.showStuHistory);
    console.log(this.showStuHistory[1].LIBRARY_CLEAR_STAUS);
    


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

selectAllChanged(event: any) {
  console.log('Select All changed:', event.target.checked);

  if (this.showStuHistory) {
    this.showStuHistory.forEach((item: { LIBRARY_CLEAR_STAUS: any; }) => {
      if (item) {
        item.LIBRARY_CLEAR_STAUS = event.target.checked ? 1 : 0;
      }
    });

    // Manually trigger change detection
    this.cdr.detectChanges();
  }
}



onCheckboxChange(event: any, showStuHistry: any) {
  showStuHistry.LIBRARY_CLEAR_STAUS = event.target.checked ? 1 : 0;

  console.log("librarY_CLEAR_STATUS" + showStuHistry.LIBRARY_CLEAR_STAUS);
  console.log("ID" + showStuHistry.ID);

  const allChecked = this.pageOfItems?.every(item => item?.librarY_CLEAR_STATUS) ?? false; // Use false as the default value
  const selectAllCheckbox = document.getElementById('selectall') as HTMLInputElement;

  // Check if the element is found before accessing its properties
  if (selectAllCheckbox) {
    selectAllCheckbox.checked = allChecked;
  }
}



libraryCLerFormdata() { 
  const requestData = {
    "studenT_ID": 0,  
  
  "libraryclearancedetail": this.showStuHistory.map((item: any) => ({
      "id": item.ID,
      "librarY_CLEAR_STATUS": item.LIBRARY_CLEAR_STAUS
    })),
    "addedby": "1",   
    "updatedby": "1",
    "mode": "A"   
  };

  this.loading = true;
  
  // Make the API call
  this.serviceData.submitStudentLibrary(requestData).subscribe(
    (response: any) => {
      this.addSuccessmessage = true;
      if (response.updatedData) {
        this.pageOfItems = response.updatedData;
      }      
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
         window.location.reload();
      }, 1000);
      console.log('API Response:', response);
    },
    (error:any) => {
      console.error('API Error:', error);
    }
  );
}


}
