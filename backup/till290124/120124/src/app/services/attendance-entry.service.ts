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
    const userId = getFromLocalStorage('userId');
    //  const userId = getFromLocalStorage('userId');
     const classTime_paper_ID = getFromLocalStorage('class_time_paper_ID');
     const class_time_ID = getFromLocalStorage('class_time_ID');
    var data=
    {
      "id": 0,
      "timetablE_ID": class_time_ID,
      "studenT_ID": 0,
      "attendancedetail": [
        {
          "studenT_ID": 0,
          "iS_ATTENDANCE": 0,
          "papeR_ID": classTime_paper_ID
        }
      ],
      "instructoR_ID": 0,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }



  submitAttendance(data: any): Observable<any> {
    const endpoint = `${this.url}`; // Replace with your actual API endpoint
    return this.http.post<any>(endpoint, data);
  }






}
