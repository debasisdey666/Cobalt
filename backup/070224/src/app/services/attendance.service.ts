import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  url=environment.baseUrl+"api/Filter_ClassTimetable";

  showAttendanceStudnt(){
    const userId = getFromLocalStorage('userId');
    const studenId = getFromLocalStorage('studenId');
    var data=
    {
      
        "useR_ID": userId,
        "reporT_TYPE": 3,
        "instructoR_ID": 18,
        "studenT_ID": studenId,
        "clasS_OF_DATE_START": "2024-01-09",
        "clasS_OF_DATE_END": "2024-01-09",
        "clasS_OF_DATE_MONTH": "JANUARY",
        "papeR_ID": 1
      
    }
    return this.http.post(this.url,data)
  }

  showMonthYear(){
    const userId = getFromLocalStorage('userId');
    const studenId = getFromLocalStorage('studenId');
    var data=
    {
      
        "useR_ID": userId,
        "reporT_TYPE": 4,
        "instructoR_ID": 18,
        "studenT_ID": studenId,
        "clasS_OF_DATE_START": "2024-01-09",
        "clasS_OF_DATE_END": "2024-01-09",
        "clasS_OF_DATE_MONTH": "JANUARY",
        "papeR_ID": 1
      
    }
    return this.http.post(this.url,data)
  }

  filterSearch(data: any) {
    // You can now pass the 'data' object as a parameter to the HTTP POST request
    return this.http.post(this.url, data);
  }


}
