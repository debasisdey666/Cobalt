import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  url = environment.baseUrl+"api/Role";

  showRole(){
    var data = 
    {
      "rolE_ID": 0,
      "rolE_Name": "string",
      "description": "string",
      "status": true,
      "addedby": "string",
      "updatedby": "string",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  

  addRole(formData:any){
    const userId = getFromLocalStorage('userId');
    var data = 
    {
      "rolE_ID": 0,
      "rolE_Name": formData.rolE_Name,
      "description": formData.description,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }

  editRole(formData:any){
    const userId = getFromLocalStorage('userId');
    var data = 
    {
      "rolE_ID": formData.ROLE_ID,
      "rolE_Name": formData.rolE_Name,
      "description": formData.description,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }

  statusRole(formData:any){

    
    const userId = getFromLocalStorage('userId');
    var data = 
    {
      "rolE_ID": formData.ROLE_ID,
      "rolE_Name": "string",
      "description": "string",
      "status": !formData.STATUS,
      "addedby": "string",
      "updatedby": "string",
      "mode": "I"
    }

    // var data:any;
    // if(formData.STATUS == false){
    //   data=
    //   {
    //      "rolE_ID": formData.ROLE_ID,
    //   "rolE_Name": "string",
    //   "description": "string",
    //   "status": true,
    //   "addedby": userId,
    //   "updatedby": userId,
    //   "mode": "I"
    //   }
    // }
    // else if (formData.STATUS == true){
    //   data=
    //   {
    //     "rolE_ID": formData.ROLE_ID,
    //     "rolE_Name": "string",
    //     "description": "string",
    //     "status": false,
    //     "addedby": userId,
    //     "updatedby": userId,
    //     "mode": "I"
    //   }
    // }


    return this.http.post(this.url,data)
  }

}
