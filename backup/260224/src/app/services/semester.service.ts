import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  url=environment.baseUrl+"api/Semester";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showSemester(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "seM_CODE": "string",
      "sem": "string",
      "seM_TYPE": "string",
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  showSemesterTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "seM_CODE": "string",
      "sem": "string",
      "seM_TYPE": "string",
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "F"
    }
    return this.http.post(this.url,data)
  }

  addSemester(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "seM_CODE": formData.seM_CODE,
      "sem": formData.sem,
      "seM_TYPE": formData.seM_TYPE,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "A"
    }    
    return this.http.post(this.url,data)
  }


  editSem(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": formData.id,
      "seM_CODE": formData.seM_CODE,
      "sem": formData.sem,
      "seM_TYPE": formData.SEM_TYPE,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "U"
    } 
      return this.http.post(this.url,data)
    }



    


    statusSem(formData:any){
      const userId = getFromLocalStorage('userId');

       console.log(formData.id);
       const toggledStatus = !formData.STATUS;

       const data=
        {
          "id": formData.ID,
          "seM_CODE": "",
          "sem": "",
          "seM_TYPE": "string",
          "status": toggledStatus,
          "addedby": "string",
          "updatedby": "string",
          "mode": "I"
        }
      
      return this.http.post(this.url,data)
    }




}
