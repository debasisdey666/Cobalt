import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ChapterService } from 'src/app/services/chapter.service';
import { PaperService } from 'src/app/services/paper.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { BranchService } from 'src/app/services/branch.service';
import { SemesterService } from 'src/app/services/semester.service';
import { PaperResponse } from './PaperResponse.interface';
import { getFromLocalStorage } from '../../../environments/local-storage-util'; 

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getChapterForm') getChapterForm!: NgForm;
  @ViewChild('chapterFormedit') chapterFormedit!: NgForm;

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
    loading: boolean = false;

    totalPages: any;
    pageSize: number = 3;
    currentPage: number = 1;
    pageRange: number = 3;
    itemsPerPage: number = 3;
    pageOfItems: any[] = [];

    
  filteredItems: any[] = [];
  searchFilters: { [key: string]: string } = {};

    ngOnInit(): void {
      this.serviceData.showChapter().subscribe((data) => {
        this.showChapter = data;
        this.showCptr =  this.showChapter['Data'];
        console.log("this.showCptr");
        console.log(this.showCptr);
        this.updateFilteredItems();
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
  
  //  pageSize =6;
  //  items = [];
  //  pageOfItems: Array<any> | undefined;
 
  //  onChangePage(pageOfItems: Array<any>) {
  //    this.pageOfItems = pageOfItems;
  //  }

   
   updateFilteredItems() {
    // If search filters are present, filter the data
    if (Object.values(this.searchFilters).some(filter => !!filter)) {
      this.filteredItems = this.showCptr.filter((item:any) =>
        Object.keys(this.searchFilters).every(
          (key) =>
            !this.searchFilters[key] ||
            (item[key] &&
              typeof item[key] === 'string' &&
              item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
        )
      );
    } else {
      // If no search filters, show all data
      this.filteredItems = this.showCptr.slice();
    }
  
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
  
    // Update studentCount after filtering
    // this.studentCount = this.filteredItems.length;
  }

  

    paginate(array: any[], pageNumber: number, pageSize: number): any[] {
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return array.slice(startIndex, endIndex);
    }
  

    onChangePage(pageNumber: number): void {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.updateFilteredItems();
      }
    }
  
    onPreviousButtonClick(): void {
      if (this.currentPage > 1) {
        this.onChangePage(this.currentPage - 1);
      }
    }
    pagesArray(): number[] {
      return Array(this.totalPages).fill(0).map((_, index) => index + 1);
    }
    onNextButtonClick(): void {
      if (this.currentPage < this.totalPages) {
        this.onChangePage(this.currentPage + 1);
      }
    }


   // Add Data
   getChapterFormdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.addChapter(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getChapterForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 
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
    "BRANCH_NAME": "",
    "PAPER_ID": "",
    "STATUS": true,
    "ADDEDBY": "",
    "UPDATEDBY": "",
  }



  

  editBtn(showCpt:any,event:Event){
    this.chapterUpdate= JSON.parse(JSON.stringify(showCpt));
    console.log("PAPER_NAME = " + showCpt.PAPER_NAME);
    console.log("PAPER_ID = " + showCpt.PAPER_ID);
    console.log("AY_ID = " + showCpt.AY_ID);
    console.log("AY = "+ showCpt.AY);
    console.log("SEM_ID = " + showCpt.SEM_ID);
    console.log("SEM = " + showCpt.SEM);
    console.log("BRANCH_ID = " + showCpt.BRANCH_ID);
    console.log("BRANCH_NAME = " + showCpt.BRANCH_NAME);

    this.showInput = true;

    // Set items in localStorage
    localStorage.setItem('AY_ID', showCpt.AY_ID.toString());
    localStorage.setItem('SEM_ID', showCpt.SEM_ID.toString());
    localStorage.setItem('BRANCH_ID', showCpt.BRANCH_ID.toString());

   



    
        
  // this.serviceData2.showPaperDropdownBindChapter(showCpt.SEM_ID || this.selectedSemesterId,showCpt.BRANCH_ID || this.selectedBranchId,showCpt.AY_ID || this.selectedACId).subscribe((data) => {
  //   console.log('Server Response:', data);
  //    if (data && data.PAPER && data.PAPER.length > 0) {
  //     this.showPaper.PAPER = data.PAPER;
  //     this.showCptr = this.showPaper.PAPER;
  //     console.log('showCptr:', this.showpr);
  //   } else {
  //     this.showPaper.PAPER = [];
  //     this.showpr = [];
  //     console.log('No paper information available.');
  //   }
  // });

  }


  chapterFormeditdata(data:any){
    this.loading = true;
    this.isSubmit=true;
    this.serviceData.editChapter(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.chapterFormedit.resetForm();
        this.isSubmit=false;
      }, 1000); 
      this.ngOnInit(); 
      console.log(data);
    })  
  }

  onAChangeEdit(event: any): void {
    this.selectedACId = event.target.value;
    localStorage.setItem('SEM_ID', this.selectedACId);
  }
  onBranchChangeEdit(event: any): void {
    this.selectedBranchId = event.target.value;
    localStorage.setItem('BRANCH_ID', this.selectedBranchId);
  }

  showInput: boolean = true;
  onSemestereditChange(event: any): void {

    const selectedSemesterId = event.target.value;
    localStorage.setItem('SEM_ID', selectedSemesterId);

    this.showInput = false;

    // Retrieve items from localStorage
    const AY_ID = localStorage.getItem('AY_ID');
    const SEM_ID = localStorage.getItem('SEM_ID');
    const BRANCH_ID = localStorage.getItem('BRANCH_ID');

    // Convert values to numbers or set default values if they are null
    const AYID: number = AY_ID ? +AY_ID : 0;
    const SEMID: number = SEM_ID ? +SEM_ID : 0;
    const BRANCHID: number = BRANCH_ID ? +BRANCH_ID : 0;

    console.log("BRANCH_NAME = " + BRANCHID);
    console.log("Sem = " + SEMID);
    console.log("AC = " + AYID);

    this.serviceData2.showPaperDropdownBindEditChapter(SEMID,BRANCHID,AYID).subscribe(
      (data: PaperResponse) => {
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
      },
      (error) => {
        console.error('Error fetching paper data:', error);
        // Handle error as needed
      }
    );
  }



   // active / deactive Data

  actvinactv(showCpt:any,event:Event){
    this.chapterUpdate= showCpt;
    console.log(showCpt.ID);
  }

  chapterStatusFormData() {
    this.loading = true;
    this.serviceData.statusChapter(this.chapterUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton3.nativeElement.click();
        }, 1000); 
        this.ngOnInit(); 
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
