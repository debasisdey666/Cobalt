import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceEntryService {

  url=environment.baseUrl+"api/Attendance";

  constructor(private http: HttpClient) { }

  showAttendance(){
    // const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "timetablE_ID": 1,
      "studenT_ID": 0,
      "attendancedetail": [
        {
          "studenT_ID": 0,
          "iS_ATTENDANCE": 0,
          "papeR_ID": 0
        }
      ],
      "instructoR_ID": 0,
      "status": true,
      "addedby": "10",
      "updatedby": "10",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }



  submitAttendance(data: any): Observable<any> {
    const endpoint = `${this.url}`; // Replace with your actual API endpoint
    return this.http.post<any>(endpoint, data);
  }



  // attendanceStatus(formData: any) {
  
  //   var data=
  //   {
  //     "id": 0,
  //     "timetablE_ID": 1,
  //     "studenT_ID": 0,
  //     "attendancedetail": [
  //       {
  //         "studenT_ID": 10,
  //         "iS_ATTENDANCE": 0,
  //         "papeR_ID": 3
  //       }
  //     ],
  //     "instructoR_ID": 4,
  //     "status": true,
  //     "addedby": "1",
  //     "updatedby": "1",
  //     "mode": "A"
  //   }
  //   return this.http.post(this.url,data)
  // }




}
