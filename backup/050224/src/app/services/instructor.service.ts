import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  url=environment.baseUrl+"api/Instructor";

  // userId = environment.userId;

  constructor(private http:HttpClient) { }

  showInstructor(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "name": "string",
      "brancH_ID": 0,
      "collegE_ID": 0,
      "pH_NUMBER": "string",
      "email": "string",
      "dob": "2020-10-05T11:28:39.104Z",
      "gender": "string",
      "status": true,
      "paperDetails": [
        {
          "papeR_ID": "1"
        }
      ],
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }


  statusInst(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.STATUS);
   var data:any;
   if(formData.STATUS == false){
     data=
     {
      "id": formData.ID,
      "name": "string",
      "brancH_ID": 0,
      "collegE_ID": 0,
      "pH_NUMBER": "string",
      "email": "string",
      "dob": "2020-10-05T11:28:39.104Z",
      "gender": "string",
      "status": true,
      "paperDetails": [
        {
          "papeR_ID": "1"
        }
      ],
      "addedby": userId,
      "updatedby": userId,
      "mode": "I"
    }
  
   }
   else if (formData.STATUS == true){
     data=
     {
      "id": formData.ID,
      "name": "string",
      "brancH_ID": 0,
      "collegE_ID": 0,
      "pH_NUMBER": "string",
      "email": "string",
      "dob": "2020-10-05T11:28:39.104Z",
      "gender": "string",
      "status": false,
      "paperDetails": [
        {
          "papeR_ID": "1"
        }
      ],
      "addedby": userId,
      "updatedby": userId,
      "mode": "I"
    }
   }

   return this.http.post(this.url,data)
 }
  




}
