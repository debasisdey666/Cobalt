import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class WeeklyTimetableService {

  url=environment.baseUrl+"api/WeeklyTimeTableCreate/ViewWeeklyTimeTableCreate";
  url2=environment.baseUrl+"api/WeeklyTimeTableCreate/WeeklyTimeTableCreate";

  constructor(private http: HttpClient) { }

  showWeekTimetabl(){
    // const userId = getFromLocalStorage('userId');
    var data=
    {
      "id":2,
      "reporT_TYPE": 1
    }
    return this.http.post(this.url,data)
  }  
  
  addWeekTimetabl(){
    var data=
    {
      "id": 2,
      "aY_ID": 0,
      "brancH_ID": 0,
      "seM_ID": 0,
      "timetabledetails": [
        {
          "weekdaY_NAME": "Monday",
          "sttime": "17:00:00",
          "endtime": "18:00:00",
          "papeR_ID": 95,
          "instructoR_ID":18,
          "roomno": "4A"
        }
      ],
      "addedby": "1",
      "updatedby": "1",
      "mode": "A"
    }
    return this.http.post(this.url2,data)
  }

}
