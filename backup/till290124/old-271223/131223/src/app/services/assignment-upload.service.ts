import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignmentUploadService {  

  private url = environment.baseUrl + "api/AssignmentUpload";
  // userId = environment.userId;  
  // studentId = environment.studentId;
  
  selectedFile: any;

  constructor(private http: HttpClient) { }

  showAssignmentUpload(ASSIGNMENT_ID: number): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');

    // console.log('this.studentId');
    // console.log(this.studentId);
    

    // Create a new FormData object to send form data
    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', '0');
    data.append('ASSIGNMENT_ID',String(ASSIGNMENT_ID));
    // data.append('STUDENT_ID', '10');
    if (studentId !== null) {
      data.append('STUDENT_ID', studentId);
    }
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
    }

    data.append('INSTRUCTOR_ID', '1');
    data.append('STATUS', 'true');
    data.append('STUDENT_REMARKS', 'ok');
    data.append('INSTRUCTOR_REMARKS', 'ok');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');

    // Send a POST request with the FormData
    return this.http.post<any>(this.url, data);
  }


}
