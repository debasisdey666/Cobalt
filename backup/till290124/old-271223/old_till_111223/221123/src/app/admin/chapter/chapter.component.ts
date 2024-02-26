import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ChapterService } from 'src/app/services/chapter.service';
import { PaperService } from 'src/app/services/paper.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { BranchService } from 'src/app/services/branch.service';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(
    private serviceData:ChapterService,
    private serviceData2:PaperService,
    private serviceData3:AcademicYearService,
    private serviceData4:BranchService,
    private serviceData5:SemesterService,
    ) { }

    showChapter:any;
    showCptr:any;
    // showPaper:any;
    showACData:any;
    showBranchData:any;
    showBranch:any;
    showSemesterTrue:any;
    showSem:any;
    showAcademicYearTrue:any;
    // showpr:any;
    isSubmit=false;  
    addSuccessmessage:boolean=false;
    updateSuccessmessage:boolean=false;

    ngOnInit(): void {
      this.serviceData.showChapter().subscribe((data) => {
        this.showChapter = data;
        this.showCptr =  this.showChapter['Data'];
        console.log(this.showCptr);
      })

      // this.serviceData2.showPaperTrue().subscribe((data) => {
      //   this.showPaper = data;
      //   this.showpr =  this.showPaper['Data'];
        
      // })

      this.serviceData3.showAcademicYearTrue().subscribe((data) => {
        this.showACData = data;
        this.showAcademicYearTrue = this.showACData['Data'];
      })

      this.serviceData4.showBranchTrue().subscribe((data) => {
        this.showBranchData = data;
        this.showBranch =  this.showBranchData['Data'];
      })

      this.serviceData5.showSemesterTrue().subscribe((data) => {
        this.showSemesterTrue = data;
        this.showSem =  this.showSemesterTrue['Data'];
        console.log(this.showSem);
      })

    }

    selectedBranch: any;
  selectedSemester: any;

  // Flag to determine if Semester dropdown should be enabled
  isSemesterEnabled: boolean = false;

  

  selectedPaper: any;
  showpr: any[] = [];
  showPaper: { PAPER: any[] } = { PAPER: [] };
  selectedSemesterId: any; 
  selectedBranchId: any; 
  selectedACId: any; 

  onAChange(event: any): void {
    this.selectedACId = event.target.value;
    console.log('Selected AC ID:', this.selectedACId);
  }
  onBranchChange(event: any): void {
    this.selectedBranchId = event.target.value;
    console.log('Selected Branch ID:', this.selectedBranchId);
  }

  onSemesterChange(event: any): void {
    const selectedSemesterId = event.target.value;
  console.log('Selected Semester ID:', selectedSemesterId);
  console.log('Selected Branch ID:', this.selectedBranchId);
  console.log('Selected AC ID:', this.selectedACId);
    
  this.serviceData2.showPaperDropdownBindChapter(selectedSemesterId,this.selectedBranchId,this.selectedACId).subscribe((data) => {
    console.log('Server Response:', data);
     if (data && data.PAPER && data.PAPER.length > 0) {
      this.showPaper.PAPER = data.PAPER;
      this.showpr = this.showPaper.PAPER;
      console.log('showpr:', this.showpr);
    } else {
      this.showPaper.PAPER = [];
      this.showpr = [];
      console.log('No paper information available.');
    }
  });
  }
    
   // Pagination
  
   pageSize =6;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }


   // Add Data
   getChapterFormdata(data:any){
    this.isSubmit=true;
    this.serviceData.addChapter(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);

      console.log(data);
    })  
  }


   // edit Data

  chapterUpdate = {
    "ID": 0,
    "CHAPTER_NAME": "",
    "AY_ID": "",
    "AY": "",
    "PAPER_NAME": "",
    "SEM_ID": "",
    "SEM": "",
    "BRANCH_ID": "",
    "PAPER_ID": "",
    "STATUS": true,
    "ADDEDBY": "",
    "UPDATEDBY": "",
  }

  

  editBtn(showCpt:any,event:Event){
    this.chapterUpdate= JSON.parse(JSON.stringify(showCpt));
    console.log(showCpt.PAPER_NAME);

    
        
  // this.serviceData2.showPaperDropdownBindChapter(showCpt.SEM_ID,showCpt.BRANCH_ID,showCpt.AY_ID).subscribe((data) => {
  //   console.log('Server Response:', data);
  //    if (data && data.PAPER && data.PAPER.length > 0) {
  //     this.showPaper.PAPER = data.PAPER;
  //     this.showpr = this.showPaper.PAPER;
  //     console.log('showpr:', this.showpr);
  //   } else {
  //     this.showPaper.PAPER = [];
  //     this.showpr = [];
  //     console.log('No paper information available.');
  //   }
  // });

  }


  chapterFormeditdata(data:any){
    this.isSubmit=true;
    this.serviceData.editChapter(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log(data);
    })  
  }



   // active / deactive Data

  actvinactv(showCpt:any,event:Event){
    this.chapterUpdate= showCpt;
    console.log(showCpt.ID);
  }

  chapterStatusFormData() {

    this.serviceData.statusChapter(this.chapterUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        setTimeout(function () {
          window.location.reload();
        }, 500);
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
