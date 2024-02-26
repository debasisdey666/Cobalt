import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class PaperTypeService {

  url=environment.baseUrl+"api/PaperType";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showPapertype(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "papeR_TYPE": "string",
      "description": "string",
      "status": true,
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

  showPapertypeTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "papeR_TYPE": "string",
      "description": "string",
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "F"
    }
    return this.http.post(this.url,data)
  }


  addPapertype(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "papeR_TYPE": formData.papeR_TYPE,
      "description": formData.description,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }

  editPapertype(formData:any){
    const userId = getFromLocalStorage('userId');
    //  console.log(formData.id);
    //  console.log(formData.papeR_TYPE);
    //  console.log(formData.description);
      var data=
      {
        "id": formData.id,
        "papeR_TYPE": formData.papeR_TYPE,
        "description": formData.description,
        "status": true,
        "addedby": userId,
      "updatedby": userId,
        "mode": "U"
      }
      // const token = localStorage.getItem("token");
      // let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer ' + token)
      // .set('Content-Type', 'application/json');
      //return this.http.post(this.url,data,{headers})
      return this.http.post(this.url,data)
    }


    statusPapertype(formData:any){
      const userId = getFromLocalStorage('userId');
      // console.log(formData.STATUS);
      var data:any;
      if(formData.STATUS == false){
        data=
        {
          "id": formData.ID,
          "papeR_TYPE": "",
          "description": "",
          "status": true,
          "addedby": userId,
      "updatedby": userId,
          "mode": "I"
        }
      }
      else if (formData.STATUS == true){
        data=
        {
          "id": formData.ID,
          "papeR_TYPE": "",
          "description": "",
          "status": false,
          "addedby": userId,
      "updatedby": userId,
          "mode": "I"
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
