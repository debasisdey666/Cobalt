import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private url = environment.baseUrl + "api/Assignment";
  // userId = environment.userId;

  selectedFile: any;

  constructor(private http: HttpClient) { }

  showAssignment(): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const data = new FormData();
    data.append('ID', '0');
    data.append('PAPER_ID', '0');
    data.append('ASSIGNMENT_DETAILS', 'string');
    if (this.selectedFile) {
      data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
    }
    data.append('CUTOFF_DATE', '10/10/2023');
    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');
    return this.http.post<any>(this.url, data);
  }

  showAssignmentwithID(id: number): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const data = new FormData();
    data.append('ID', String(id));
    data.append('PAPER_ID', '0');
    data.append('ASSIGNMENT_DETAILS', 'string');
    if (this.selectedFile) {
      data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
    }
    data.append('CUTOFF_DATE', '10/10/2023');
    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');
    return this.http.post<any>(this.url, data);
  }


  statusAssignment(formData: any) {
    const userId = getFromLocalStorage('userId');
    // Log the formData.ID and formData.STATUS for debugging
    console.log(formData.ID);
    console.log(formData.STATUS);

    // Create a new FormData object to store the data
    const data = new FormData();

    // Always append these values
    data.append('ID', formData.ID);
    data.append('PAPER_ID', '0');
    data.append('ASSIGNMENT_DETAILS', 'string');

    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('ASSIGNMENT_DOCUMENT', this.selectedFile, this.selectedFile.name);
    }
    data.append('CUTOFF_DATE', '10/10/2023');

    // Toggle the STATUS based on formData.STATUS
    if (formData.STATUS === false) {
      data.append('STATUS', 'true'); // Toggle the status to true
    } else if (formData.STATUS === true) {
      data.append('STATUS', 'false'); // Toggle the status to false
    }

    // data.append('ADDEDBY', userId);
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    // data.append('UPDATEDBY', '1');
    data.append('MODE', 'I');

    // Send a POST request with the FormData
    return this.http.post(this.url, data);
  }

}
