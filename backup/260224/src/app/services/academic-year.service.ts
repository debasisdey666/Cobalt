import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';


@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  // private baseUrl = 'http://89.117.62.190/COBALT/api/AcademicYear';

  url=environment.baseUrl+"api/AcademicYear";

  

  //url = 'https://api.publicapis.org/entries'

  constructor(private http: HttpClient) { }

  showAcademicYear(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aY_CODE": 0,
      "ay": "string",
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  showAcademicYearTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aY_CODE": 0,
      "ay": "string",
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "F"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  addAY(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "aY_CODE": formData.aY_CODE,
      "ay": formData.ay,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "A"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    //return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

editAY(formData:any){
  const userId = getFromLocalStorage('userId');
  console.log(formData.ID);
  console.log(formData.AY_CODE);
  console.log(formData.AY);
    var data=
    {
      "id": formData.ID,
      "aY_CODE": formData.aY_CODE,
      "ay": formData.ay,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "U"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    //return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }



  statusAY(formData:any){
    const userId = getFromLocalStorage('userId');
    // console.log(formData.STATUS);
    var data:any;
    if(formData.STATUS == false){
      data=
      {
        "id": formData.ID,
        "aY_CODE": 1,
        "ay": "",
        "status": true,
        "ADDEDBY": userId,
        "UPDATEDBY": userId,
        "mode": "I"
      }
    }
    else if (formData.STATUS == true){
      data=
      {
        "id": formData.ID,
        "aY_CODE": 1,
        "ay": "",
        "status": false,
        "ADDEDBY": userId,
      "UPDATEDBY": userId,
        "mode": "I"
      }
    }
    return this.http.post(this.url,data)
  }

}
