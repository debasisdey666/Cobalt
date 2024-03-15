import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  url=environment.baseUrl+"api/UpdatePassword";

  constructor(private http: HttpClient) { }

  chnagePass(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": userId,
      "password": formData.password,
      "updatedby": userId,
      "changeMode": "U"
    }
    return this.http.post(this.url,data)
  }
  
}
