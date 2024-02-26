import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

  url=environment.baseUrl+"api/StudentTimeTable";

  constructor(private http: HttpClient) { }

  // getTimetableData() {    
  //   var data=
  //   {
  //     "id": 10,     
  //     "mode": "V"
  //   }
  //   return this.http.post(this.url, data);
  // }


  getTimetableData(requestData: any) {
    return this.http.post(this.url, requestData);
  }

  
}
