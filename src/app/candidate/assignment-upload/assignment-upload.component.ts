import { Component, OnInit } from '@angular/core';
import { AssignmentUploadService } from 'src/app/services/assignment-upload.service';
import { AssignmentService } from 'src/app/services/assignment.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-assignment-upload',
  templateUrl: './assignment-upload.component.html',
  styleUrls: ['./assignment-upload.component.css']
})
export class AssignmentUploadComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('closeButton4') closeButton4!: ElementRef;
  @ViewChild('getAssignmntUploadForm') getAssignmntUploadForm!: NgForm;
  @ViewChild('editLedgerForm') editLedgerForm!: NgForm;
  @ViewChild('deleteAssignForm') deleteAssignForm!: NgForm;
  
  @ViewChild('editAssignmntUploadForm') editAssignmntUploadForm!: NgForm;

  ASSIGNMENT_ID: number;

  constructor(
    private serviceData: AssignmentUploadService,
    private serviceData2: AssignmentService,
    private route: ActivatedRoute,    
    private http:HttpClient,
    private cd: ChangeDetectorRef
    ) {
      this.ASSIGNMENT_ID = 2;
     }

     


    //  studentId = environment.studentId;

  showAssignmentUpld:any;
  showAsUpld:any;
  ROLE_ID:any;
  cutofdateWithId:any;

  linkurl: string =environment.baseUrl;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;
  formattedDate: any;
  formattedcutofDate: any;

  ngOnInit() {   
    this.route.params.subscribe(params => {
      const ASSIGNMENT_ID = params['ASSIGNMENT_ID'];
      console.log('ASSIGNMENT_ID:', ASSIGNMENT_ID);
        this.serviceData.showAssignmentUpload(ASSIGNMENT_ID).subscribe(data => {
          this.showAssignmentUpld = data;
          this.showAsUpld = this.showAssignmentUpld['Data'];
          console.log(this.showAsUpld);
        });      
    });
    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    this.cutofdateWithId= getFromLocalStorage('cutofdateWithId');

    const today = new Date();
    const cutOffDate = new Date(this.cutofdateWithId);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    this.formattedDate = today.toLocaleString('en-US', options);
    this.formattedcutofDate = cutOffDate.toLocaleString('en-US', options);
    console.log(this.formattedDate);
    console.log("cutOffDate" + this.formattedcutofDate);

    
  }

  // Pagination
  
  pageSize =5;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }





// edit Data

assignmentUplodUpdate = {
  ID:"",
  STATUS:"",
  ASSIGNMENT_DETAILS:"",
  ASSIGNMENT_DOCUMENT:"",
  STUDENT_REMARKS: '',
  INSTRUCTOR_REMARKS:"",
  PAPER_ID:"",
  PAPER_NAME:"",
  CUTOFF_DATE:"",
}



editBtn(showAsgnUpld: any, event: Event) {
  this.assignmentUplodUpdate = JSON.parse(JSON.stringify(showAsgnUpld));
  this.cd.detectChanges(); // Manually trigger change detection
}

  // Modify the addTopic method to send the file
  editAssignmentUpload(formData: any, ASSIGNMENT_ID: number) {
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');

    const data = new FormData();

    const assignmentId = this.route.snapshot.paramMap.get('ASSIGNMENT_ID');
    console.log('ASSIGNMENT_ID:', assignmentId);

    console.log('typeof ASSIGNMENT_ID');
    console.log(ASSIGNMENT_ID);

    const STUDENT_ID_val = 10;
    const INSTRUCTOR_ID_val = 1;
    
    data.append('ID', formData.ID);
   // data.append('ASSIGNMENT_ID',assignmentId);

    if (assignmentId) {
      // Make sure assignmentId is not null before appending
      data.append('ASSIGNMENT_ID', assignmentId);
    } else {
      data.append('ASSIGNMENT_ID', '0');
    }

    // data.append('STUDENT_ID', STUDENT_ID_val.toString());
    
    if (studentId !== null) {
      data.append('STUDENT_ID', studentId);
    }

    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
    }

    data.append('INSTRUCTOR_ID',INSTRUCTOR_ID_val.toString());
    data.append('STATUS', 'true');
    data.append('STUDENT_REMARKS', formData.STUDENT_REMARKS);
    data.append('INSTRUCTOR_REMARKS', formData.INSTRUCTOR_REMARKS);
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'U');


   // Send a POST request with the FormData
   return this.http.post<any>(this.url, data);
   }
 
   // ... Other code ...
 
   // Modify the getTopicFormdata method to call addTopic
   editAssignmntUploadFormdata(data: any) {
    // this.isSubmit = true;
    this.loading = true;
    this.editAssignmentUpload(data, this.ASSIGNMENT_ID).subscribe((result) => {
      this.loading = false;
      this.addSuccessmessage = true;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.editAssignmntUploadForm.resetForm();
      }, 1000);
      console.log(data);
      
      this.ngOnInit();
    });
  }





 // Other properties and methods...

 @ViewChild('fileInput') fileInput: ElementRef | undefined;
 selectedFile: File | undefined;

 // ... Other code ...

 onFileSelected(event: any) {
   this.selectedFile = event.target.files[0];
   console.log(this.selectedFile);
 }

 url=environment.baseUrl+"api/AssignmentUpload";
//  userId = environment.userId;
 


   // Modify the addTopic method to send the file
   addAssignmentUpload(formData: any, ASSIGNMENT_ID: number) {

    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');
    const data = new FormData();

    const assignmentId = this.route.snapshot.paramMap.get('ASSIGNMENT_ID');
    console.log('ASSIGNMENT_ID:', assignmentId);

    console.log('typeof ASSIGNMENT_ID');
    console.log(ASSIGNMENT_ID);

    // const STUDENT_ID_val = 10;
    const INSTRUCTOR_ID_val = 1;
    
    data.append('ID', '0');
   // data.append('ASSIGNMENT_ID',assignmentId);

    if (assignmentId) {
      // Make sure assignmentId is not null before appending
      data.append('ASSIGNMENT_ID', assignmentId);
    } else {
      data.append('ASSIGNMENT_ID', '0');
    }

    // data.append('STUDENT_ID', STUDENT_ID_val.toString());
    if (studentId !== null) {
      data.append('STUDENT_ID', studentId);
    }

    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
    }

    data.append('INSTRUCTOR_ID',INSTRUCTOR_ID_val.toString());
    data.append('STATUS', 'true');
    data.append('STUDENT_REMARKS', formData.STUDENT_REMARKS);
    data.append('INSTRUCTOR_REMARKS', formData.INSTRUCTOR_REMARKS);
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
   getAssignmntUploadFormdata(data: any) {
    // this.isSubmit = true;
    this.loading = true;
    this.addAssignmentUpload(data, this.ASSIGNMENT_ID).subscribe((result) => {
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getAssignmntUploadForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 
    });
  }
  


    // delete Data

    assignmentDelete = {
      ID:"",
    }
  
    deleteBtn(showAsgnUpld: any, event: Event) {
      this.assignmentDelete = showAsgnUpld;
      console.log("this.assignmentDelete.ID");
      console.log(this.assignmentDelete.ID);
      
    }

    formData = {
      ID: '',
    };
  
  
    deleteAssignmentUpload(formData: any) {
      const userId = getFromLocalStorage('userId');
      const studentId = getFromLocalStorage('studentId');
  
      const data = new FormData();
      
      data.append('ID', formData.ID);
      data.append('ASSIGNMENT_ID',"0");
       data.append('STUDENT_ID', "0");
       data.append('STUDENT_ID', "0");
        data.append('ASSIGNMENT_DOCUMENT', "0");
  
      data.append('INSTRUCTOR_ID',"0");
      data.append('STATUS', 'true');
      data.append('STUDENT_REMARKS', "0");
      data.append('INSTRUCTOR_REMARKS', "0");
      if (userId !== null) {
        data.append('ADDEDBY', userId);
      }
      if (userId !== null) {
        data.append('UPDATEDBY', userId);
      }
      data.append('MODE', 'D');
  
  
     // Send a POST request with the FormData
     return this.http.post<any>(this.url, data);
     }
    
  
      deleteAssignFormData(data: any) {
        // this.isSubmit = true;
        this.loading = true;
        this.deleteAssignmentUpload(data).subscribe((result) => {
          this.loading = false;
            this.updateSuccessmessage = true;
          setTimeout(() => {
            this.updateSuccessmessage = false;
            this.closeButton4.nativeElement.click();
            this.deleteAssignForm.resetForm();
          }, 1000);
          console.log(data);
          
          this.ngOnInit();
        });
      }

    
  // formData = {
  //   firstName: '',
  //   lastName: ''
  // };

  // deleteAssignFormData(formValue: any) {
  //   console.log('Form Value:', formValue);
  // }





}
