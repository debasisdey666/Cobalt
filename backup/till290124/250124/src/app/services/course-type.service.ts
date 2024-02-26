import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  url=environment.baseUrl+"api/CourseType";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showCourseType(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "COURSE_TYPE": "string",
      "DESCRIPTION": "string",
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "V"
    }
    return this.http.post(this.url,data)
  }


  showCourseTypeTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "COURSE_TYPE": "string",
      "DESCRIPTION": "string",
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "V"
    }
    return this.http.post(this.url,data)
  }



  addCourseType(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.COURSE_TYPE);
    console.log(formData.DESCRIPTION);

    var data=
    {
      "ID": 0,
      "COURSE_TYPE": formData.COURSE_TYPE,
      "DESCRIPTION": formData.DESCRIPTION,
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "A"
    }

    return this.http.post(this.url,data)
  }


  editCT(formData:any){
    const userId = getFromLocalStorage('userId');
      var data=
      {
        "ID": formData.ID,
        "COURSE_TYPE":formData.COURSE_TYPE,
        "DESCRIPTION": formData.DESCRIPTION,
        "STATUS": true,
        "ADDEDBY": "string",
        "UPDATEDBY": "string",
        "MODE": "U"
      }
      return this.http.post(this.url,data)
    }

    statusCT(formData:any){
      const userId = getFromLocalStorage('userId');
       console.log(formData.STATUS);
      var data:any;
      if(formData.STATUS == false){
        data=
        {
          "ID": formData.ID,
          "COURSE_TYPE":"string",
          "DESCRIPTION": "string",
          "STATUS": true,
          "ADDEDBY": "1",
          "UPDATEDBY": "1",
          "MODE": "I"
        }
      }
      else if (formData.STATUS == true){
        data=
        {
          "ID": formData.ID,
          "COURSE_TYPE":"string",
          "DESCRIPTION": "string",
          "STATUS": false,
          "ADDEDBY": "1",
          "UPDATEDBY": "1",
          "MODE": "I"
        }
      }
  
      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      // });
  
      // const token = localStorage.getItem("token");
      // let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer ' + token)
      // .set('Content-Type', 'application/json');
      // return this.http.post(this.url,data,{headers})
      return this.http.post(this.url,data)
    }
}
