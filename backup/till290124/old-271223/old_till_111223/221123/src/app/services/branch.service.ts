import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  url=environment.baseUrl+"api/Branch";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showBranch(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "BRANCH_CODE": "string",
      "BRANCH_NAME": "string",
      "PROGRAMME_ID": 0, 
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

  showBranchTrue(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": 0,
      "BRANCH_CODE": "string",
      "BRANCH_NAME": "string",
      "PROGRAMME_ID": 0, 
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "F"
    }
    return this.http.post(this.url,data)
  }

  addBranch(formData:any){
   
    const userId = getFromLocalStorage('userId');
    
    var data=
    {
      "ID": 0,
      "BRANCH_CODE": formData.BRANCH_CODE,
      "BRANCH_NAME": formData.BRANCH_NAME,
      "PROGRAMME_ID": formData.PROGRAMME_ID, 
      "STATUS": true,
      "addedby": userId,
      "updatedby": userId,
      "MODE": "A"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    //return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  editBranch(formData:any){
    const userId = getFromLocalStorage('userId');
      var data=
      {
        "ID": formData.ID,
        "BRANCH_CODE": formData.BRANCH_CODE,
        "BRANCH_NAME": formData.BRANCH_NAME,
        "PROGRAMME_ID": formData.PROGRAMME_ID, 
        "STATUS": true,
        "addedby": userId,
      "updatedby": userId,
        "MODE": "U"
      }
      // const token = localStorage.getItem("token");
      // let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer ' + token)
      // .set('Content-Type', 'application/json');
      //return this.http.post(this.url,data,{headers})
      return this.http.post(this.url,data)
    }

    statusBranch(formData:any){
     
    const userId = getFromLocalStorage('userId');
    
     var data:any;
     if(formData.STATUS == false){
       data=
       {
         "ID": formData.ID,
        "BRANCH_CODE": "string",
        "BRANCH_NAME": "string",
        "PROGRAMME_ID": 1, 
        "STATUS": true,
        "addedby": userId,
      "updatedby": userId,
        "MODE": "I"
       }
     }
     else if (formData.STATUS == true){
       data=
       {
        "ID": formData.ID,
        "BRANCH_CODE": "string",
        "BRANCH_NAME": "string",
        "PROGRAMME_ID": 1, 
        "STATUS": false,
        "addedby": userId,
      "updatedby": userId,
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
