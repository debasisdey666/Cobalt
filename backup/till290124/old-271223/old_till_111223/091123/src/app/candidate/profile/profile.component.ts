import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { StudentlistService } from '../../services/studentlist.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { CollegeService } from '../../services/college.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util'; 


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  linkurl: string =environment.baseUrl;
  showStudentData:any;
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

  
  url=environment.baseUrl+"api/StudentDetails";

  // userId = environment.userId;

  constructor(
    private serviceData:ProfileService,   
    private serviceData2:BranchService,
    private serviceData3:AcademicYearService,
    private serviceData4:SemesterService,
    private serviceData5:CollegeService,
    private http:HttpClient,
  ) { }

  ngOnInit(): void {
    this.serviceData.showStudentDetails().subscribe((data) => {
      this.showStudentData = data;
      this.showStudent =  this.showStudentData['Data'];
     console.log(this.showStudent);
    })
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
  }


  // Other properties and methods...

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('fileInput2') fileInput2: ElementRef | undefined;
  selectedFile: File | undefined;
  selectedFile2: File | undefined;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];
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
     // data.append('ADDEDBY', userId);
     if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    // data.append('UPDATEDBY', '1');
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





}
