import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url=environment.baseUrl+"api/StudentAttendanceGraph";
  url2=environment.baseUrl+"api/NoticeEvents";
  url3=environment.baseUrl+"api/MIS/instructorcount";
  url4=environment.baseUrl+"api/MIS/studentcount";
  url5=environment.baseUrl+"api/MIS/feescollection";

  selectedFile: any;

  constructor(private http: HttpClient) { }


  // showAttendance(){
  //   const userId = getFromLocalStorage('userId');
  //   var data=
  //   {
  //     "useR_ID": userId,
  //     "clasS_OF_DATE": "2024-12-20",
  //     "mode": "V"
  //   }
  //   return this.http.post(this.url,data)
  // }

  showAttendance(): Observable<any> {
    const userId = getFromLocalStorage('userId');
    const data = {
      useR_ID: userId,
      clasS_OF_DATE: '2024-12-20',
      mode: 'V'
    };
    return this.http.post<any>(this.url, data);
  }





  showNoticeEvent(): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const ROLE_ID = getFromLocalStorage('ROLE_ID');
    
    // Create a new FormData object to send form data
    const data = new FormData();

    data.append('ID', '0');
    data.append('TYPE_ID', '1');
    // data.append('ROLE', ROLE_ID);
    if (ROLE_ID !== null) {
      data.append('ROLE', ROLE_ID);
    }
    data.append('FROMDATE', '2024-02-01');
    data.append('TODATE', '2024-02-28');
    data.append('TITLE', 'string');
    data.append('DETAILS', 'string');
    if (this.selectedFile) {
      data.append('FILEPATH', this.selectedFile, this.selectedFile.name);
    }
    data.append('NEWFLAG', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');

    return this.http.post<any>(this.url2, data);

  }

  showEvent(): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const ROLE_ID = getFromLocalStorage('ROLE_ID');
    
    // Create a new FormData object to send form data
    const data = new FormData();

    data.append('ID', '0');
    data.append('TYPE_ID', '2');
    // data.append('ROLE', ROLE_ID);
    if (ROLE_ID !== null) {
      data.append('ROLE', ROLE_ID);
    }
    data.append('FROMDATE', '2024-02-01');
    data.append('TODATE', '2024-02-28');
    data.append('TITLE', 'string');
    data.append('DETAILS', 'string');
    if (this.selectedFile) {
      data.append('FILEPATH', this.selectedFile, this.selectedFile.name);
    }
    data.append('NEWFLAG', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'F');

    return this.http.post<any>(this.url2, data);

  }

  showScholarship(): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const ROLE_ID = getFromLocalStorage('ROLE_ID');
    
    // Create a new FormData object to send form data
    const data = new FormData();

    data.append('ID', '0');
    data.append('TYPE_ID', '3');
    // data.append('ROLE', ROLE_ID);
    if (ROLE_ID !== null) {
      data.append('ROLE', ROLE_ID);
    }
    data.append('FROMDATE', '2024-02-01');
    data.append('TODATE', '2024-02-28');
    data.append('TITLE', 'string');
    data.append('DETAILS', 'string');
    if (this.selectedFile) {
      data.append('FILEPATH', this.selectedFile, this.selectedFile.name);
    }
    data.append('NEWFLAG', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'F');

    return this.http.post<any>(this.url2, data);

  }



  showInstructor(): Observable<any> {
    const userId = getFromLocalStorage('userId');
    const data = {
      "brancH_ID": 0
    };
    return this.http.post<any>(this.url3, data);
  }

  showStudent(): Observable<any> {
    const userId = getFromLocalStorage('userId');
    const data = {
      "brancH_ID": 0,
      "currenT_SEM": 0,
      "currenT_AY": 0
    };
    return this.http.post<any>(this.url4, data);
  }

  showFeescollection(): Observable<any> {
    const userId = getFromLocalStorage('userId');
    const data = {
      "semID": 0,
      "branchID": 0,
      "ayid": 0,
      "paymenT_DATE": new Date().toISOString().split('T')[0]
    };
    return this.http.post<any>(this.url5, data);



  }

  

}
