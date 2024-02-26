import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  url=environment.baseUrl+"api/College";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showCollegeType(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "COLLEGE_CODE": "string",
      "COLLEGE_NAME": "string",
      "UNIVERSITY_ID": 1,
      "STATUS": true,
      "ADDEDBY": "string",
      "UPDATEDBY": "string",
      "MODE": "V"
    }
    return this.http.post(this.url,data)
  }
  showCollegeTypeTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "COLLEGE_CODE": "string",
      "COLLEGE_NAME": "string",
      "UNIVERSITY_ID": 1,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "F"
    }
    return this.http.post(this.url,data)
  }

  
  addColg(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "COLLEGE_CODE": formData.COLLEGE_CODE,
      "COLLEGE_NAME": formData.COLLEGE_NAME,
      "UNIVERSITY_ID": formData.UNIVERSITY_ID,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "A"
    }
    return this.http.post(this.url,data)
  }

  editCollege(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log("formData.COLLEGE_CODE");
    console.log(formData.ID);
    console.log(formData.COLLEGE_NAME);
    console.log("formData.UNIVERSITY_ID");
    console.log(formData.UNIVERSITY_ID);
    var data=
    {

      "ID": formData.ID,
      "COLLEGE_CODE": formData.COLLEGE_CODE,
      "COLLEGE_NAME": formData.COLLEGE_NAME,
      "UNIVERSITY_ID": formData.UNIVERSITY_ID,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "U"

    }
    return this.http.post(this.url,data)
  }

  statusColg(formData:any){
    const userId = getFromLocalStorage('userId');
     console.log(formData.STATUS);
    var data:any;
    if(formData.STATUS == false){
      data=
      {
        "ID": formData.ID,
        "COLLEGE_CODE": "string",
        "COLLEGE_NAME": "string",
        "UNIVERSITY_ID": 1,
        "STATUS": true,
        "ADDEDBY": userId,
      "UPDATEDBY": userId,
        "MODE": "I"
      }
    }
    else if (formData.STATUS == true){
      data=
      {
        "ID": formData.ID,
        "COLLEGE_CODE": "string",
        "COLLEGE_NAME": "string",
        "UNIVERSITY_ID": 1,
        "STATUS": false,
        "ADDEDBY": userId,
      "UPDATEDBY": userId,
        "MODE": "I"
      }
    }

    return this.http.post(this.url,data)
  }
}
