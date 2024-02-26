import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  url=environment.baseUrl+"api/Programme";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showProgramme(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "PROGRAMME_CODE": "string",
      "PROGRAMME_NAME": "string",
      "COURSE_TYPE": 0,
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }


  showProgrammeTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "PROGRAMME_CODE": "string",
      "PROGRAMME_NAME": "string",
      "COURSE_TYPE": 0,
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "V"
    }
    return this.http.post(this.url,data)
  }


  addProgramme(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.PROGRAMME_CODE);
    console.log(formData.PROGRAMME_NAME);
    console.log(formData.COURSE_TYPE);

    var data=
    {
      "ID": 0,
      "PROGRAMME_CODE": formData.PROGRAMME_CODE,
      "PROGRAMME_NAME": formData.PROGRAMME_NAME,
      "COURSE_TYPE": formData.COURSE_TYPE,
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "A"
    }

    return this.http.post(this.url,data)
  }


  editProgrm(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": formData.ID,
      "PROGRAMME_CODE": formData.PROGRAMME_CODE,
      "PROGRAMME_NAME": formData.PROGRAMME_NAME,
      "COURSE_TYPE": formData.COURSE_TYPE,
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "Mode": "U"
    }
      return this.http.post(this.url,data)
    }



    statusProgrm(formData:any){
      const userId = getFromLocalStorage('userId');
      console.log(formData.id);
      const toggledStatus = !formData.STATUS;
      const data=
      {
       "ID": formData.ID,
       "PROGRAMME_CODE": "",
       "PROGRAMME_NAME": "",
       "COURSE_TYPE": 1,
       "STATUS": toggledStatus,
       "ADDEDBY": userId,
       "UPDATEDBY": userId,
       "Mode": "I"
     }
     return this.http.post(this.url,data)
   }


}
