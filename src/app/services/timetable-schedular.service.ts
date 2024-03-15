import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util'; 

@Injectable({
  providedIn: 'root'
})
export class TimetableSchedularService {

  url=environment.baseUrl+"api/TimeTableSchedular";

  constructor(private http: HttpClient) { }

  showTimetableSchedular(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aycode": 0,
      "brancH_ID": 0,
      "seM_ID": 0,
      "fromdate": "2024-01-01",
      "todate": "2024-01-01",
      "generatE_STATUS": 0,
      "addedby": "1",
      "updatedby": "1",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addTimetableSchedular(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aycode": formData.AY_CODE,
      "brancH_ID": formData.BRANCH_ID,
      "seM_ID": formData.SEM_ID,
      "fromdate": formData.fromdate,
      "todate": formData.todate,
      "generatE_STATUS": 1,
      "addedby": "1",
      "updatedby": "1",
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }
  editTimetableSchedular(formData:any){
    debugger
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": formData.ID,
      "aycode": formData.AYCODE,
      "brancH_ID": formData.BRANCH_ID,
      "seM_ID": formData.SEM,
      "fromdate": formData.FROMDATE,
      "todate": formData.TODATE,
      "generatE_STATUS": 1,
      "addedby": "1",
      "updatedby": "1",
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }
  statusTimetableSchedular(formData:any){
    debugger
    const userId = getFromLocalStorage('userId');
    let generateStatus: any // Default value

    // Toggle the status based on the value of formData.generatE_STATUS
    if (formData.GENERATE_STATUS === false) {
      generateStatus = 1; // Toggle the status to true
    } else if (formData.GENERATE_STATUS === true) {
      generateStatus = 0; // Toggle the status to false
    }
    var data=
    {
      "id":formData.ID,
      "aycode": 0,
      "brancH_ID": 0,
      "seM_ID": 0,
      "fromdate": "2024-01-01",
      "todate": "2024-01-01",
      "generatE_STATUS": generateStatus,
      "addedby": "1",
      "updatedby": "1",
      "mode": "I"
    }
    return this.http.post(this.url,data)
  }


 

}
