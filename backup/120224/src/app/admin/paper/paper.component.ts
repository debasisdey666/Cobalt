import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaperService } from 'src/app/services/paper.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { BranchService } from 'src/app/services/branch.service';
import { PaperTypeService } from 'src/app/services/paper-type.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getPaperForm') getPaperForm!: NgForm;
  @ViewChild('paperFormedit') paperFormedit!: NgForm;

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(
    private serviceData:PaperService,
    private serviceData2:AcademicYearService,
    private serviceData3:SemesterService,
    private serviceData4:BranchService,
    private serviceData5:PaperTypeService,
    ) { }

    showPaper:any;
    showpr:any;
    showAcademicYearTrue:any;
    showSem:any;
    showACData:any;
    showBranchData:any;
    showPapertype:any;
    showPTData:any;
    showBranch:any;
    showSemesterTrue:any;
    isSubmit=false;  
    addSuccessmessage:boolean=false;
    updateSuccessmessage:boolean=false;
    loading: boolean = false;

    totalPages: any;
    pageSize: number = 5;
    currentPage: number = 1;
    pageRange: number = 5;
    itemsPerPage: number = 5;
    pageOfItems: any[] = [];

    
  filteredItems: any[] = [];
  searchFilters: { [key: string]: string } = {};

  ngOnInit(): void {
    this.serviceData.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
      this.updateFilteredItems();

      console.log("paper");
      console.log(this.showpr);
    })

    this.serviceData2.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })

    this.serviceData3.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem =  this.showSemesterTrue['Data'];
      console.log(this.showSem);
    })

    this.serviceData4.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })

    this.serviceData5.showPapertypeTrue().subscribe((data) => {
      this.showPTData = data;
      this.showPapertype =  this.showPTData['Data'];
      console.log(this.showPapertype);
    })

  }

   // Pagination
  
  //  pageSize =5;
  //  items = [];
  //  pageOfItems: Array<any> | undefined;
 
  //  onChangePage(pageOfItems: Array<any>) {
  //    this.pageOfItems = pageOfItems;
  //  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pageRange / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);
  
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }
  
    return visiblePages;
  }
   


   updateFilteredItems() {
    // If search filters are present, filter the data
    if (Object.values(this.searchFilters).some(filter => !!filter)) {
      this.filteredItems = this.showpr.filter((item:any) =>
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
      this.filteredItems = this.showpr.slice();
    }
  
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
  
    // Update studentCount after filtering
    // this.studentCount = this.filteredItems.length;
  }

  

    // paginate(array: any[], pageNumber: number, pageSize: number): any[] {
    //   return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    // }

    paginate(array: any[], pageNumber: number, pageSize: number): any[] {
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return array.slice(startIndex, endIndex);
    }
  
    // onChangePage(pageNumber: number): void {
    //   this.currentPage = pageNumber;
    //   console.log('Current Page:', this.currentPage);
    //   this.updateFilteredItems();
    // }

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
   getPaperFormdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.addPaper(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getPaperForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 

      console.log(data);
    })  
  }



   // edit Data

  paperUpdate = {
    "ID":0,
    "PAPER_CODE": "string",
    "PAPER_NAME": "string",
    "BRANCH_ID": 0,
    "SEM_ID": 0,
    "SEM": "",
    "AY":"",
    "AY_ID": 0,
    "PAPER_TYPE_ID": 0,
    "CREDIT_SCORE": 0,
    "PAPER_TYPE":"",
    "STATUS": "",

  }

  editBtn(showprdata:any,event:Event){
    this.paperUpdate= JSON.parse(JSON.stringify(showprdata));
    console.log(showprdata.CREDIT_SCORE)
  }


  paperFormeditdata(data: any) {
    this.loading = true;
    // this.isSubmit = true;
    this.serviceData.editPaper(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.paperFormedit.resetForm();
      }, 1000); 
      this.ngOnInit(); 
      console.log(data);
    })
  }



    // active / deactive Data

    actvinactv(showprdata:any,event:Event){
      this.paperUpdate= showprdata;
      console.log(showprdata.ID);
    }


    paperStstusFormData() {
      this.loading = true;
      this.serviceData.statusPaper(this.paperUpdate).subscribe(
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
