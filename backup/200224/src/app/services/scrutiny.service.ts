import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class ScrutinyService {

  url=environment.baseUrl+"api/Scrutiny";

  constructor(private http: HttpClient) { }

  showScrutiny(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aY_ID": 0,
      "seM_ID": 0,
      "papeR_ID": 0,
      "studenT_ID": 0,
      "registratioN_NO": "string",
      "rolL_NO": "12345",
      "remarks": "test",
      "status": true,
      "addedby": userId,
      "updatedby": "1",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addScrutiny(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aY_ID": formData.aY_ID,
      "seM_ID": formData.seM_ID,
      "papeR_ID": formData.papeR_ID,
      "studenT_ID": formData.studenT_ID,
      "registratioN_NO": formData.registratioN_NO,
      "rolL_NO": formData.rolL_NO,
      "remarks": formData.remarks,
      "status": true,
      "addedby": userId,
      "updatedby": "1",
      "mode": "A"
   }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    //return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }


}
