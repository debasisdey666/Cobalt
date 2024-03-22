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

  constructor(private http: HttpClient) { }

  showWeekTimetabl(){
    // const userId = getFromLocalStorage('userId');
    var data=
    {
      "id":1,
      "reporT_TYPE": 1
    }
    return this.http.post(this.url,data)
  }

}
