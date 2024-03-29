import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url=environment.baseUrl+"api/UserCreator";

  constructor(private http: HttpClient) { }

  showUser(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": 0,
      "useR_NAME": "string",
      "password": "string",
      "phone": "string",
      "email": "string",
      "status": true,
      "addedby": "string",
      "updatedby": "string",
      "role": 0,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addUser(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": 0,
      "useR_NAME": formData.USER_NAME,
      "password": formData.PASSWORD,
      "phone": formData.PHONE,
      "email": formData.EMAIL,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "role": parseInt(formData.ROLE_ID),
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }

  editUser(formData:any){
    
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": formData.USER_ID,
      "useR_NAME": formData.USER_NAME,
      "password": formData.PASSWORD,
      "phone": formData.PHONE,
      "email": formData.EMAIL,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "role": parseInt(formData.ROLE_ID),
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }

  activeInactiveUser(formData:any){
    const userId = getFromLocalStorage('userId');
    const formstatus = !formData.STATUS;
    const status = formstatus ? false : true;
    var data=
    {
      "useR_ID": formData.USER_ID,
      "useR_NAME": "",
      "password": "",
      "phone": "",
      "email": "",
      "status": formstatus,
      "addedby": userId,
      "updatedby": userId,
      "role": 0,
      "mode": "I"
    }
    return this.http.post(this.url,data)
  }

}
