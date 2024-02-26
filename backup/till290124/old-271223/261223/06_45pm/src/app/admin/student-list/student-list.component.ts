import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import { StudentlistService } from '../../services/studentlist.service';
import { HttpClient } from '@angular/common/http';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { CollegeService } from '../../services/college.service';
import * as XLSX from 'xlsx';
import{ HttpHeaders, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(
    private serviceData:StudentlistService,    
    private serviceData2:BranchService,
    private serviceData3:AcademicYearService,
    private serviceData4:SemesterService,
    private serviceData5:CollegeService,
    private http:HttpClient,
    ) { }

  linkurl: string =environment.baseUrl;
  // showStudentData:any;
  showStudent:any;
  showBranchData:any;
  showACData:any;
  showAcademicYearTrue:any;
  showSemesterTrue:any;
  showSem:any;
  showBranch:any;
  showCTData:any;
  showCollegeType:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  errorMessage:boolean=false;

  showStudentData: any[] = [];
  pageOfItems: any[] = [];
  searchText: string = '';
  filteredItems: any[] = [];
  searchFilters: { [key: string]: string } = {};
  pageSize: number = 4;
  currentPage: number = 1;

  

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  
  // pageOfItems!: any[];
   studentCount: number = 0; // Initialize the property

  ngOnInit(): void {
    // this.serviceData.showStudentlist().subscribe((data) => {
    //   this.showStudentData = data;
    //   this.showStudent =  this.showStudentData['Data'];
    //   this.studentCount = this.showStudent.length; 
    //   console.log(this.showStudent);
    //   this.updateFilteredItems();
    // })

    this.serviceData2.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })

    this.serviceData3.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
      // console.log("this.showAcademicYearTrue");
      // console.log(this.showAcademicYearTrue);
    })

    this.serviceData4.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem =  this.showSemesterTrue['Data'];
      //console.log(this.showSem);
    })

    this.serviceData5.showCollegeTypeTrue().subscribe((data) => {
      this.showCTData = data;
      this.showCollegeType =  this.showCTData['Data'];
    })

    // this.serviceData.showStudentlist().subscribe((data) => {
    //   this.showStudentData = data['Data'];
    //   this.pageOfItems = this.showStudentData;
    //   this.updateFilteredItems();
    // });
    this.loadData();
   
  }

  loadData() {
    this.serviceData.showStudentlist().subscribe((data) => {
      this.showStudentData = data['Data'];
      this.updateFilteredItems();
    });
  }
  


  updateFilteredItems() {
    const filteredItems = this.showStudentData.filter((item) =>
      Object.keys(this.searchFilters).every(
        (key) =>
          !this.searchFilters[key] ||
          (item[key] &&
            typeof item[key] === 'string' &&
            item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
      )
    );

    // Paginate the filtered items
    this.pageOfItems = this.paginate(filteredItems, this.currentPage, this.pageSize);
  }

  paginate(array: any[], pageNumber: number, pageSize: number): any[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  onChangePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.updateFilteredItems();
  }

  resetPagination(): void {
    this.currentPage = 1;
    this.updateFilteredItems();
  }



  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredItems);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Save the Excel file
    XLSX.writeFile(wb, 'student-data.xlsx');
  }




  selectedCollege: number = 0; 
  selectedBranch: number = 0; 




    // Other properties and methods...

    @ViewChild('fileInput') fileInput: ElementRef | undefined;
    @ViewChild('fileInput2') fileInput2: ElementRef | undefined;
    selectedFile: File | undefined;
    selectedFile2: File | undefined;
  
    // ... Other code ...
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
    onFileSelected2(event: any) {
      this.selectedFile2 = event.target.files[0];
    }

    url=environment.baseUrl+"api/StudentDetails";


 // Modify the addTopic method to send the file
 addStudent(formData: any) {
  
  const userId = getFromLocalStorage('userId');
  const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', '0');
    data.append('STUDENT_REGISTRATION', formData.STUDENT_REGISTRATION);
    data.append('STUDENT_NAME', formData.STUDENT_NAME);
    data.append('REGISTRATION_YEAR', formData.REGISTRATION_YEAR);
    data.append('BRANCH_ID', formData.BRANCH_ID);
    data.append('CURRENT_AY',formData.CURRENT_AY);
    data.append('CURRENT_SEM', formData.CURRENT_SEM);
    data.append('COLLEGE_ID', formData.COLLEGE_ID);
    data.append('FATHER_NAME', formData.FATHER_NAME);
    data.append('MOTHER_NAME', formData.MOTHER_NAME);
    data.append('PH_NUMBER', formData.PH_NUMBER);
    data.append('EMAIL', formData.EMAIL);
    data.append('ADHAAR_NO', formData.ADHAAR_NO);
    data.append('DOB', formData.DOB);
    data.append('ADDRESS', formData.ADDRESS);
    data.append('STATE', formData.STATE);
    data.append('DISTRICT', formData.DISTRICT);
    data.append('PINCODE', formData.PINCODE);
    data.append('GENDER', formData.GENDER);
    data.append('CATEGORY', formData.CATEGORY);
    data.append('IS_PWD', formData.IS_PWD,);
    data.append('MARITAL_STATUS', formData.MARITAL_STATUS);
    
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('PHOTO_PATH', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile2) {
      data.append('SIGNATURE_PATH', this.selectedFile2, this.selectedFile2.name);
    }
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

  // Add Data
  getStudentFormdata(data: any) {
    this.isSubmit = true;
    this.addStudent(data).subscribe((result) => {
      this.addSuccessmessage = true;
      setTimeout(function () {
        window.location.reload();
      }, 500);        
    });
}


    // edit Data

    studentUpdate = {
      ID:"",
      PHOTO_PATH:"",
      SIGNATURE_PATH:"",
      STUDENT_NAME: "",
      STATUS:"",
      STUDENT_REGISTRATION:"",
      REGISTRATION_YEAR:"",
      BRANCH_NAME:"",
      BRANCH_ID:"",
      CURRENT_AY:"",
      AY:"",
      COLLEGE_ID:"",
      COLLEGE_NAME:"",
      CURRENT_SEM:"",
      SEM:"",
      FATHER_NAME:"",
      MOTHER_NAME:"",
      PH_NUMBER:"",
      EMAIL:"",
      ADHAAR_NO:"",
      DOB: "",
      ADDRESS:"",
      STATE:"",
      DISTRICT:"",
      PINCODE:"",
      GENDER:"",
      CATEGORY:"",
      IS_PWD:"",
      MARITAL_STATUS:"",
    }
  
  
    editBtn(showStudnt: any, event: Event) {
      this.studentUpdate = JSON.parse(JSON.stringify(showStudnt));
      this.studentUpdate.DOB = this.DateString(showStudnt.DOB) ?? "";
      console.log("showStudnt.DOB");
      console.log(showStudnt.DOB);
      console.log(showStudnt.SIGNATURE_PATH);
      console.log(showStudnt.PHOTO_PATH);
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



  editStudent(formData:any){
     
    console.log(formData.GENDER);
    

    const userId = getFromLocalStorage('userId');
    const isPwd = !!formData.IS_PWD;
    const maritalStatus = !!formData.MARITAL_STATUS;
   
    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', formData.ID);
    data.append('STUDENT_REGISTRATION', formData.STUDENT_REGISTRATION);
    data.append('STUDENT_NAME', formData.STUDENT_NAME);
    data.append('REGISTRATION_YEAR', formData.REGISTRATION_YEAR);
    data.append('BRANCH_ID', formData.BRANCH_ID);
    data.append('CURRENT_AY',formData.CURRENT_AY);
    data.append('CURRENT_SEM', formData.CURRENT_SEM);
    data.append('COLLEGE_ID', formData.COLLEGE_ID);
    data.append('FATHER_NAME', formData.FATHER_NAME);
    data.append('MOTHER_NAME', formData.MOTHER_NAME);
    data.append('PH_NUMBER', formData.PH_NUMBER);
    data.append('EMAIL', formData.EMAIL);
    data.append('ADHAAR_NO', formData.ADHAAR_NO);
    data.append('DOB', formData.DOB);
    data.append('ADDRESS', formData.ADDRESS);
    data.append('STATE', formData.STATE);
    data.append('DISTRICT', formData.DISTRICT);
    data.append('PINCODE', formData.PINCODE);
    data.append('GENDER', formData.GENDER);
    data.append('CATEGORY', formData.CATEGORY);
    data.append('IS_PWD', formData.IS_PWD,);
    data.append('MARITAL_STATUS', formData.MARITAL_STATUS);
    
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('PHOTO_PATH', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile2) {
      data.append('SIGNATURE_PATH', this.selectedFile2, this.selectedFile2.name);
    }
    data.append('STATUS', 'true');
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
   

    studentFormeditdata(data: any) {
      this.isSubmit = true;
    this.editStudent(data).subscribe((result) => {
      this.addSuccessmessage = true;
      setTimeout(function () {
        window.location.reload();
      }, 500);        
    });
      // this.isSubmit = true;
      // this.serviceData.editStudent(data).subscribe((result) => {
      //   this.addSuccessmessage = true;
      //   this.ngOnInit();
      //   setTimeout(function () {
      //     window.location.reload();
      //   }, 500);
      //   console.log(data);
      // })
    }



    // active / deactive Data

  actvinactv(showStudnt:any,event:Event){
    this.studentUpdate= showStudnt;
  }

  studentStstusFormData() {
  
    this.serviceData.statusStudent(this.studentUpdate).subscribe(
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


  // *************bulk upload***********

url4=environment.baseUrl+"api/BulkStudentUpload/BulkStudentUpload";

// selectedFile: File = null;
fd = new FormData();

onFileSelected3(event:any) {  
  this.selectedFile = <File>event.target.files[0];
  this.fd.append('file', this.selectedFile,this.selectedFile.name);
}

userbulklistFormData(){
const token = localStorage.getItem("token");      
     this.http.post(this.url4,this.fd,{
      headers: new HttpHeaders({'Authorization':  'Bearer ' + token })}).subscribe(
      (resp) => {
          console.log(resp);
          this.addSuccessmessage=true;
            setTimeout(function() {
              window.location.reload();
          }, 1000);
        },
        (err) => {
          console.log(err);
           this.errorMessage=true;
        //   setTimeout(function() {
        //     window.location.reload();
        // }, 1000);
        }
     ); 
}

// *************bulk upload end***********


}
