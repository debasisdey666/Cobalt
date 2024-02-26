import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util'; 

@Injectable({
  providedIn: 'root'
})
export class StudentPaperMappingService {

  url=environment.baseUrl+"api/StudentPaperMapping";
  url2=environment.baseUrl+"api/StudentDetails";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showstupap: any;




  selectedFile: any;
  selectedFile2: any;

  showStudentlist(){
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studenId');

    console.log("studentId");
    console.log(studentId);
    
    const data = new FormData();

    // Add key-value pairs to the FormData object
    if (studentId !== null) {
      data.append('ID', studentId);
    }
    data.append('STUDENT_REGISTRATION', '0');
    data.append('STUDENT_NAME', '0');
    data.append('REGISTRATION_YEAR', '0');
    data.append('BRANCH_ID', '0');
    data.append('CURRENT_AY', '0');
    data.append('CURRENT_SEM', '0');
    data.append('COLLEGE_ID', '0');
    data.append('FATHER_NAME', '0');
    data.append('MOTHER_NAME', '0');
    data.append('PH_NUMBER', '0');
    data.append('EMAIL', '0');
    data.append('ADHAAR_NO', '0');
    data.append('DOB', '1990-10-30');
    data.append('ADDRESS', '0');
    data.append('STATE', '0');
    data.append('DISTRICT', '0');
    data.append('PINCODE', '0');
    data.append('GENDER', '0');
    data.append('CATEGORY', '0');
    data.append('IS_PWD', 'true');
    data.append('MARITAL_STATUS', 'true');
    
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('PHOTO_PATH', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile2) {
      data.append('SIGNATURE_PATH', this.selectedFile2, this.selectedFile2.name);
    }
    data.append('STATUS', 'true');
    // data.append('ADDEDBY', '1');
    // data.append('UPDATEDBY', '1');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');
    // Send a POST request with the FormData
    return this.http.post<any>(this.url2, data);
  }



  showStudentPaperMapping(){
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studenId');
    const CURRENT_SEM = getFromLocalStorage('CURRENT_SEM');

    var data=
    {
      "id": 0,
      "studenT_ID":studentId,
      "paperdetails": [
        {
          "papeR_ID": "0",
          "score": "string",
          "result": "string"
        },
        {
          "papeR_ID": "0",
          "score": "string",
          "result": "string"
        },
    {
          "papeR_ID": "0",
          "score": "string",
          "result": "string"
        }
      ],
      "appearinG_SEM": CURRENT_SEM,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addStudentPaperMapping(data: any) {    
    return this.http.post(this.url, data);
  }


}
