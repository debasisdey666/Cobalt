import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

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
      "instructoR_ID": 4,
      "status": true,
      "addedby": "string",
      "updatedby": "string",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

}
