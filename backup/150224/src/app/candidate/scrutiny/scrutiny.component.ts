import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ScrutinyService } from '../../services/scrutiny.service';
import { SemesterService } from '../../services/semester.service';
import { AcademicYearService } from '../../services/academic-year.service';
import { PaperService } from '../../services/paper.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util';


@Component({
  selector: 'app-scrutiny',
  templateUrl: './scrutiny.component.html',
  styleUrls: ['./scrutiny.component.css']
})
export class ScrutinyComponent implements OnInit {


  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('getScrutinyForm') getSemForm!: NgForm;
  @ViewChild('editScrutinyForm') semFormedit!: NgForm;

  showScrutnyData:any;
  showScrutiny:any;
  showAcademicYearTrue:any;
  showACData:any;
  showSemester:any;
  studentNm:any;
  regNo:any;
  showSem:any;
  studentId:any;
  showPaper:any;
  showpr:any;
  showAcademicYear:any;
  ROLE_ID:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  errormessage: boolean = false;
  loading: boolean = false;

  totalPages: any;
  pageSize: number = 6;
  currentPage: number = 1;
  pageRange: number = 6;
  itemsPerPage: number =6;
  pageOfItems: any[] = [];

  
filteredItems: any[] = [];
searchFilters: { [key: string]: string } = {};


  constructor(
    private serviceData: ScrutinyService,
    private serviceData2: SemesterService,
    private serviceData3: AcademicYearService,
    private serviceData4: PaperService,
    
    ) {}

  ngOnInit(): void {
    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    this.serviceData.showScrutiny().subscribe((data) => {
      this.showScrutnyData = data;
      this.showScrutiny = this.showScrutnyData['Data'];
      this.studentNm = this.showScrutiny[0].STUDENT_NAME;
      this.studentId = this.showScrutiny[0].STUDENT_ID;
      this.regNo = this.showScrutiny[0].REGISTRATION_NO;
      console.log(this.showScrutiny[0].SEM);
      console.log(this.showScrutiny);
      this.updateFilteredItems();
    })

    this.serviceData2.showSemester().subscribe((data) => {
      this.showSemester = data;
      this.showSem =  this.showSemester['Data'];
      console.log("Semester");
      console.log(this.showSem);
    })

    this.serviceData3.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })

    this.serviceData4.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
      // console.log(this.showpr);
    })


  }

   
getVisiblePages(): number[] {
  const visiblePages: number[] = [];
  const startPage = Math.max(1, this.currentPage - Math.floor(this.pageRange / 2));
  const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);

  for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
  }

  return visiblePages;
}



  // Serach filter Start

   updateFilteredItems() {
    if (Object.values(this.searchFilters).some(filter => !!filter)) {
      this.filteredItems = this.showScrutiny.filter((item:any) =>
        Object.keys(this.searchFilters).every(
          (key) =>
            !this.searchFilters[key] ||
            (item[key] &&
              typeof item[key] === 'string' &&
              item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
        )
      );
    } else {
      this.filteredItems = this.showScrutiny.slice();
    }
  
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
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

// Serach filter End

getScrutinyFormdata(data: any) {
  this.loading = true;
  this.serviceData.addScrutiny(data).subscribe((resp: any)=>{
    if (resp.Res.StatusCode == 200 ){
      this.addSuccessmessage=true;  
      this.loading = false; 
    }
    else{
      this.errormessage=true;   
      this.loading = false; 
    }
    // setTimeout(() => {
    //   this.addSuccessmessage = false;
    //   this.errormessage = false;
    //   this.closeButton.nativeElement.click();
    //   this.getSemForm.resetForm();
    // }, 1000);
    // this.ngOnInit(); 
    // console.log(data);
  })
}


}
