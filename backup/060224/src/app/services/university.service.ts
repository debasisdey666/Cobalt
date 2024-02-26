import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  showUnivData() {
    throw new Error('Method not implemented.');
  }
  showCollegeUnivType() {
    throw new Error('Method not implemented.');
  }

 

  url=environment.baseUrl+"api/University";

  //userId = userId;

  constructor(private http: HttpClient) { }


 

  showUniversity(){

    const userId = getFromLocalStorage('userId');

    var data=
    {
      "ID": 0,
      "UNIVERSITY_CODE": "string",
      "UNIVERSITY_NAME": "string",
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "V"
    }
    return this.http.post(this.url,data)

    
  }

  showUniversityTrue(){

    const userId = getFromLocalStorage('userId');

    var data=
    {
      "ID": 0,
      "UNIVERSITY_CODE": "string",
      "UNIVERSITY_NAME": "string",
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "F"
    }
    return this.http.post(this.url,data)
  }

  addUnv(formData:any){

    const userId = getFromLocalStorage('userId');


    var data=
    {
      "ID": 0,
      "UNIVERSITY_CODE": formData.UNIVERSITY_CODE,
      "UNIVERSITY_NAME": formData.UNIVERSITY_NAME,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "A"
    }
    return this.http.post(this.url,data)
  }

  editUnv(formData:any){

    const userId = getFromLocalStorage('userId');
    console.log(formData.ID);
    console.log(formData.UNIVERSITY_CODE);
    console.log(formData.UNIVERSITY_NAME);

    var data=
    {
      "ID": formData.ID,
      "UNIVERSITY_CODE": formData.UNIVERSITY_CODE,
      "UNIVERSITY_NAME": formData.UNIVERSITY_NAME,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "U"
    }
    return this.http.post(this.url,data)
  }

  statusUniv(formData:any){

    const userId = getFromLocalStorage('userId');
    console.log(formData.STATUS);
   var data:any;
   if(formData.STATUS == false){
     data=
     {
       "ID":  formData.ID,
      "UNIVERSITY_CODE": "string",
      "UNIVERSITY_NAME": "string",
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "I"
     }
   }
   else if (formData.STATUS == true){
     data=
     {
       "ID":  formData.ID,
      "UNIVERSITY_CODE": "string",
      "UNIVERSITY_NAME": "string",
      "STATUS": false,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "I"
     }
   }

   return this.http.post(this.url,data)
 }
}
