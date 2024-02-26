import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url=environment.baseUrl+"api/StudentAttendanceGraph";

  constructor(private http: HttpClient) { }


  showAttendance(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": 93,
      "clasS_OF_DATE": "2024-12-20",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }
}
