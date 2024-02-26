import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  url=environment.baseUrl+"api/StudentDetails";

  // userId = environment.userId;

  constructor(
    private http:HttpClient
  ) { }

  selectedFile: any;
  selectedFile2: any;

  showStudentDetails() {
    
    const userId = getFromLocalStorage('userId');
    // Create a new FormData object to send form data
    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', '0');
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
    // data.append('ADDEDBY', userId);
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    // data.append('UPDATEDBY', '1');
    data.append('MODE', 'V');
    // Send a POST request with the FormData
    return this.http.post<any>(this.url, data);
  }

}
