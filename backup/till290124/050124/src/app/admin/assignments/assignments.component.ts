import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ViewChild, ElementRef } from '@angular/core';
import { PaperService } from 'src/app/services/paper.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util';

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

  constructor(
    private serviceData: AssignmentService,
    private serviceData2: PaperService,
    private http:HttpClient,
    ) { }

  ngOnInit(): void {
    this.serviceData.showAssignment().subscribe((data) => {
      this.showAssignment = data;
      this.showAsigmnt = this.showAssignment['Data'];
      console.log(this.showAsigmnt);
    });
    this.serviceData2.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
    })

    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    //  tooltip();
  }


  ngAfterViewInit(): void {
    // Trigger Bootstrap tooltip initialization after the view has been initialized
    $('[data-toggle="tooltip"]').tooltip();
  }

   // Pagination
  
   pageSize =5;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }



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
  this.isSubmit = true;
  this.editAssignment(data).subscribe((result) => {
    this.addSuccessmessage = true;
    this.ngOnInit();
    setTimeout(function () {
      window.location.reload();
    }, 500);
    console.log(data);
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
      this.isSubmit = true;
      this.addAssignment(data).subscribe((result) => {
        this.addSuccessmessage = true;
        setTimeout(function () {
          window.location.reload();
        }, 500);        
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
  



}
