import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  url=environment.baseUrl+"api/Paper";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showPaper(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "PAPER_CODE": "string",
      "PAPER_NAME": "string",
      "BRANCH_ID": 0,
      "SEM_ID": 0,
      "AY_ID": 0,
      "PAPER_TYPE_ID": 0,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  showPaperTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "PAPER_CODE": "string",
      "PAPER_NAME": "string",
      "BRANCH_ID": 0,
      "SEM_ID": 0,
      "AY_ID": 0,
      "PAPER_TYPE_ID": 0,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY":userId,
      "MODE": "F"
    }
    return this.http.post(this.url,data)
  }


  addPaper(formData:any){
    
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "PAPER_CODE": formData.PAPER_CODE,
      "PAPER_NAME": formData.PAPER_NAME,
      "BRANCH_ID": formData.BRANCH_ID,
      "SEM_ID": formData.SEM_ID,
      "AY_ID": formData.AY_ID,
      "PAPER_TYPE_ID": formData.PAPER_TYPE_ID,
      "STATUS": true,
      "ADDEDBY": userId,
        "UPDATEDBY": userId,
      "MODE": "A"
    }
    return this.http.post(this.url,data)
  }

  editPaper(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.ID);
    var data=
    {
      "ID": formData.ID,
      "PAPER_CODE": formData.PAPER_CODE,
      "PAPER_NAME": formData.PAPER_NAME,
      "BRANCH_ID": formData.BRANCH_ID,
      "SEM_ID": formData.SEM_ID,
      "AY_ID": formData.AY_ID,
      "PAPER_TYPE_ID": formData.PAPER_TYPE_ID,
      "STATUS": true,
      "ADDEDBY": userId,
        "UPDATEDBY": userId,
      "MODE": "U"
    }
      return this.http.post(this.url,data)
    }



    statusPaper(formData:any){
      const userId = getFromLocalStorage('userId');
      console.log(formData.id);
     var data:any;
     if(formData.STATUS == false){
       data=
       {
        "ID": formData.ID,
        "PAPER_CODE": "string",
        "PAPER_NAME": "string",
        "BRANCH_ID": 0,
        "SEM_ID": 0,
        "AY_ID": 0,
        "PAPER_TYPE_ID": 0,
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
        "PAPER_CODE": "string",
        "PAPER_NAME": "string",
        "BRANCH_ID": 0,
        "SEM_ID": 0,
        "AY_ID": 0,
        "PAPER_TYPE_ID": 0,
        "STATUS": false,
        "ADDEDBY": "string",
        "UPDATEDBY": "string",
        "MODE": "I"
      }
     }
     return this.http.post(this.url,data)
   }



}
