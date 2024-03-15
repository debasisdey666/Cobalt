import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ViewChild, ElementRef } from '@angular/core';
import { PaperService } from 'src/app/services/paper.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import {NgForm} from '@angular/forms';
import { formatDate } from '@angular/common';

// declare var BootstrapInit: any;
// import '../../../assets/js/bootstrap-init.js';
// const tooltip: any = BootstrapInit;

declare interface JQuery<TElement = HTMLElement> {
  tooltip(options?: any): JQuery;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {


  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getAssignmntForm') getAssignmntForm!: NgForm;
  @ViewChild('assignmentFormedit') assignmentFormedit!: NgForm;
  
// Inside your component class or a relevant function



  linkurl: string =environment.baseUrl;
  showAssignment: any;
  showAsigmnt: any;
  showPaper: any;
  ROLE_ID: any;
  showpr: any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;
  downloadSuccessmessage: boolean = false;

  maxDate: string = '';
  minDate: string | undefined;

  totalPages: any;
  pageSize: number = 6;
  currentPage: number = 1;
  pageRange: number = 6;
  itemsPerPage: number = 6;
  pageOfItems: any[] = [];
  filteredItems: any[] = [];
searchFilters: { [key: string]: string } = {};
  

  constructor(
    private serviceData: AssignmentService,
    private serviceData2: PaperService,
    private http:HttpClient,
    ) { }

  ngOnInit(): void {
    this.serviceData.showAssignment().subscribe((data) => {
      this.showAssignment = data;
      this.showAsigmnt = this.showAssignment['Data'];
       console.log("this.showAsigmnt");
       console.log(this.showAsigmnt);
      this.updateFilteredItems(); 
    });
    this.serviceData2.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
    })

    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    this.setMaxDate();

    this.setMinDate();

    

    //  tooltip();
  }


  ngAfterViewInit(): void {
    // Trigger Bootstrap tooltip initialization after the view has been initialized
    $('[data-toggle="tooltip"]').tooltip();
  }


  cutofdateWithId:any;

  onLinkClick(assignmentId: any) {
    // Make your API call here
    this.serviceData.showAssignmentwithID(assignmentId).subscribe((data) => {
      this.showAssignment = data;
      this.showAsigmnt = this.showAssignment['Data'];
      this.cutofdateWithId = this.showAsigmnt[0].CUTOFF_DATE;
      console.log("this.showAsigmnt a click");
      console.log(this.cutofdateWithId);
      localStorage.setItem('cutofdateWithId', this.cutofdateWithId);
      this.updateFilteredItems();       
    });
   
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



  // Serach filter Start

   updateFilteredItems() {
    if (Object.values(this.searchFilters).some(filter => !!filter)) {
      this.filteredItems = this.showAsigmnt.filter((item:any) =>
        Object.keys(this.searchFilters).every(
          (key) =>
            !this.searchFilters[key] ||
            (item[key] &&
              typeof item[key] === 'string' &&
              item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
        )
      );
    } else {
      this.filteredItems = this.showAsigmnt.slice();
    }
  
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
  }




// updateFilteredItems() {
//   console.log("Selected Cut Off Date:", formatDate(this.searchFilters['CUTOFF_DATE'], 'dd-MM-yyyy', 'en-US'));
//   // Format the date if it exists
//   if (this.searchFilters['CUTOFF_DATE']) {
//     const formattedDate = formatDate(this.searchFilters['CUTOFF_DATE'], 'dd-MM-yyyy', 'en-US');
//     this.searchFilters['CUTOFF_DATE'] = formattedDate;
//     console.log(this.searchFilters['CUTOFF_DATE']);
    
//   }

//   if (Object.values(this.searchFilters).some(filter => !!filter)) {
//     this.filteredItems = this.showAsigmnt.filter((item: any) =>
//       Object.entries(this.searchFilters).every(([key, value]) => {
//         // Handle date filtering separately
//         if (key === 'CUTOFF_DATE' && item[key]) {
//           // Compare dates in the same format
//           return item[key] === value;
//         } else if (item[key] && typeof item[key] === 'string') {
//           // Perform case-insensitive substring search for string values
//           return item[key].toLowerCase().includes(value.toLowerCase());
//         }
//         // For non-string values, return true to include all items
//         return true;
//       })
//     );
//   } else {
//     this.filteredItems = this.showAsigmnt.slice();
//   }

//   this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
//   this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
// }


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



   // edit Data

assignmentUpdate = {
  ID:"",
  STATUS:"",
  ASSIGNMENT_DETAILS:"",
  ASSIGNMENT_DOCUMENT:"",
  PAPER_ID:"",
  PAPER_NAME:"",
  CUTOFF_DATE:"",
}


editBtn(showAsgn: any, event: Event) {
  this.assignmentUpdate = JSON.parse(JSON.stringify(showAsgn));
  this.assignmentUpdate.CUTOFF_DATE = this.DateString(showAsgn.CUTOFF_DATE) ?? "";
}


//Convert Date

DateString(inputdate: Date | undefined): string | undefined {
if (inputdate) {
  inputdate = new Date(inputdate);
  const _inputdate =
    inputdate.getFullYear().toString() +
    '-' +
    ('0' + (inputdate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + inputdate.getDate().toString()).slice(-2);
  return _inputdate;
}
return;
}


editAssignment(formData:any) {
  const userId = getFromLocalStorage('userId');
  const data = new FormData();
  data.append('ID', formData.ID);
  data.append('PAPER_ID', formData.PAPER_ID);
  data.append('ASSIGNMENT_DETAILS', formData.ASSIGNMENT_DETAILS);

  // Check if a file is selected before adding it to FormData
  if (this.selectedFile) {
    data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
  }

  data.append('CUTOFF_DATE', formData.CUTOFF_DATE);

 data.append('STATUS', 'true');
 if (userId !== null) {
  data.append('ADDEDBY', userId);
}
if (userId !== null) {
  data.append('UPDATEDBY', userId);
}
 data.append('MODE', 'U');

  return this.http.post(this.url, data);
}

assignmentFormeditdata(data: any) {
  this.loading = true;
  // this.isSubmit = true;
  this.editAssignment(data).subscribe((result) => {
    this.addSuccessmessage = true;
    this.loading = false;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton2.nativeElement.click();
          this.assignmentFormedit.resetForm();
        }, 1000); 
        this.ngOnInit(); 
  })
}



// active / deactive Data

actvinactv(showAsgn:any,event:Event){
  this.assignmentUpdate= showAsgn;
  console.log(showAsgn.STATUS);
  
}

assignStstusFormData() {

  this.serviceData.statusAssignment(this.assignmentUpdate).subscribe(
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

  // Other properties and methods...

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | undefined;

  // ... Other code ...

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  url=environment.baseUrl+"api/Assignment";


    // Modify the addTopic method to send the file
    addAssignment(formData: any) {
      const userId = getFromLocalStorage('userId');
      const data = new FormData();
       // Add key-value pairs to the FormData object
       data.append('ID', '0');
       data.append('PAPER_ID', formData.PAPER_ID);
       data.append('ASSIGNMENT_DETAILS', formData.ASSIGNMENT_DETAILS);
   
       // Check if a file is selected before adding it to FormData
       if (this.selectedFile) {
         data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
       }
   
       data.append('CUTOFF_DATE', formData.CUTOFF_DATE);

      data.append('STATUS', 'true');
      if (userId !== null) {
        data.append('ADDEDBY', userId);
      }
      if (userId !== null) {
        data.append('UPDATEDBY', userId);
      }
      data.append('MODE', 'A');

    // Send a POST request with the FormData
    return this.http.post<any>(this.url, data);
    }
  
    // ... Other code ...
  
    // Modify the getTopicFormdata method to call addTopic
    getAssignmntFormdata(data: any) {
      this.loading = true;
      // this.isSubmit = true;
      this.addAssignment(data).subscribe((result) => {
        this.addSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton.nativeElement.click();
          this.getAssignmntForm.resetForm();
        }, 1000); 
        this.ngOnInit();        
      });
    }


    isInvalidFileType(file: File): boolean {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      return !allowedTypes.includes(file.type);
  }
  
  isInvalidFileSize(file: File): boolean {
      const maxSize = 5 * 1024 * 1024; // 5MB
      return file.size > maxSize;
  }
  

  setMaxDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    let month: number | string = today.getMonth() + 1;
    let day: number | string = today.getDate();
  
    // Ensure month and day have two digits
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    this.maxDate = `${year}-${month}-${day}`;
  }


  setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    let month: number | string = today.getMonth() + 1;
    let day: number | string = today.getDate();

    // Ensure month and day have two digits
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    // Format the date in 'yyyy-MM-dd' ISO format
    this.minDate = `${year}-${month}-${day}`;
  }



  allassignments(data:any){
    const now = new Date();

  // Extracting Date Components
  const year = now.getFullYear(); // Full year (e.g., 2024)
  const month = now.getMonth() + 1; // Month (0-11, so we add 1 to get 1-12)
  const day = now.getDate(); // Day of the month (1-31)
  const dayOfWeek = now.getDay(); // Day of the week (0-6, where 0 is Sunday)

  // Extracting Time Components
  const hours = now.getHours(); // Hour (0-23)
  const minutes = now.getMinutes(); // Minute (0-59)
  const seconds = now.getSeconds(); // Second (0-59)
  const milliseconds = now.getMilliseconds(); // Millisecond (0-999)

  // Creating a formatted string
  const formattedDate = `${day}_${month}_${year}_`;
  const formattedTime = `${hours}_${minutes}_${seconds}`;

    console.log(data);
    this.loading = true;
    this.serviceData.allAsignments(data).subscribe((response: Blob)=>{
      this.loading = false;
      this.downloadSuccessmessage = true;

      const blob = new Blob([response], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = formattedDate+formattedTime+'_assignments.zip'; // Set the filename for the download
      a.click();
      window.URL.revokeObjectURL(url);

      setTimeout(() => {
        this.downloadSuccessmessage = false;
      }, 2000);

    })
  }
  

}
