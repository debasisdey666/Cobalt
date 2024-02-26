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
  url2=environment.baseUrl+"api/MIS/feescollectiondetails";
  url3=environment.baseUrl+"api/MIS/studentcount";
  url4=environment.baseUrl+"api/MIS/LibraryDefaulter";

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

  showStudDetails(studentID: number) {
    var data = {
      "studenT_ID": studentID,
      "reporT_TYPE": 1,
      "aY_ID": 0,
      "brancH_ID": 0,
      "seM_ID": 0
    };

    return this.http.post(this.url, data);
  }

  showStudentFeesDetails(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.aY_ID);
    console.log(formData.brancH_ID);
    console.log(formData.seM_ID);
    
    var data=
    {
      
        "semID": formData.seM_ID,
        "branchID": formData.brancH_ID,
        "ayid": formData.aY_ID,
        "fromDate": formData.fmdate,
        "toDate": formData.todate,
      
    }
    return this.http.post(this.url2,data)
  }


  showStudentCnt(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.aY_ID);
    console.log(formData.brancH_ID);
    console.log(formData.seM_ID);
    
    var data=
    {
      "brancH_ID": formData.brancH_ID,
      "currenT_SEM": formData.seM_ID,
      "currenT_AY": formData.aY_ID
    }
    return this.http.post(this.url3,data)
  }


 showFacultyCnt(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.aY_ID);
    console.log(formData.brancH_ID);
    console.log(formData.seM_ID);
    
    var data=
    {
      "brancH_ID": formData.brancH_ID,
    }
    return this.http.post(this.url4,data)
  }

  showLibraryDefaulter(formData:any){
    const userId = getFromLocalStorage('userId');

    console.log("Academic Year");
    console.log(formData.fmdate);
    console.log(formData.todate);
    
    var data=
    {
      "fromDate": formData.fmdate,
      "toDate": formData.todate,
    }
    return this.http.post(this.url4,data)
  }


}
