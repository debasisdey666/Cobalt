import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  // url=environment.baseUrl+"api/Login";
  // url="http://89.117.62.190/COBALT/api/Login";

  url=environment.baseUrl+"api/Login";

  addLogin(formData:any){
    console.log(formData.useR_NAME);
    console.log(formData.password);
    var data=
    {
      useR_NAME: formData.useR_NAME,
      password: formData.password,
    }
    return this.http.post(this.url,data);
  }

}
