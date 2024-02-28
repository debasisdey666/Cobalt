import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class LibraryClearanceService {

  url=environment.baseUrl+"api/MIS/StudentHistory";

  constructor(private http: HttpClient) {
  }


  showStudentHisView(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "studenT_ID":0,
      "reporT_TYPE": 2,
      "aY_ID": 0,
      "brancH_ID": 0,
      "seM_ID": 0
    }
    return this.http.post(this.url,data)

  }

  showStudentHistory(formData:any){
    const userId = getFromLocalStorage('userId');

    let StudentHistoryAY: any;
    let StudentHistoryBranch: any;
    let StudentHistorySem: any;

    if(formData.aY_ID == ''){
      StudentHistoryAY = 0;
    }else{
      StudentHistoryAY = formData.aY_ID;
    }

    if(formData.brancH_ID == ''){
      StudentHistoryBranch = 0;
    }else{
      StudentHistoryBranch = formData.brancH_ID;
    }

    if(formData.seM_ID == ''){
      StudentHistorySem = 0;
    }else{
      StudentHistorySem = formData.seM_ID;
    }

    
    var data=
    {
      "studenT_ID":0,
      "reporT_TYPE": 2,
      "aY_ID": StudentHistoryAY,
      "brancH_ID": StudentHistoryBranch,
      "seM_ID": StudentHistorySem
    }
    return this.http.post(this.url,data)

  }


}
