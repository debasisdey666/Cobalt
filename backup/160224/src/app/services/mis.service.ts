import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class MisService {

  url=environment.baseUrl+"api/MIS/StudentHistory";

  constructor(private http: HttpClient) { }

  showStudentHistory(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.aY_ID);
    console.log(formData.brancH_ID);
    console.log(formData.seM_ID);
    
    var data=
    {
      "studenT_ID":0,
      "reporT_TYPE": 2,
      "aY_ID": formData.aY_ID,
      "brancH_ID": formData.brancH_ID,
      "seM_ID": formData.seM_ID
    }
    return this.http.post(this.url,data)
  }

}
