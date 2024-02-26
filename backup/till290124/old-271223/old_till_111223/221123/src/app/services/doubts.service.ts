import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';                    

@Injectable({
  providedIn: 'root'
})
export class DoubtsService {

  url=environment.baseUrl+"api/Doubts";
  
  // userId = environment.userId;
  // studentId = environment.studentId;


  constructor(private http: HttpClient) { }

  showDoubts(){
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');
    var data=
    {
      "id": 0,
      "topiC_ID": 0,
      "instructurE_ID": 0,
      "question": "string",
      "answare": "string",
      "status": true,
      "quS_ADDEDBY": userId,
      "anS_ADDEDBY": "0",
      "addedby":  userId,
      "updatedby": userId,
      "useR_ID": userId,
      "mode": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  addDoubts(formdata:any){
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');
    var data=
    {
      "id": 0,
      "topiC_ID": parseInt(formdata.TOPIC_ID),
      "instructurE_ID": parseInt(formdata.INSTRUCTURE_ID),
      "question":  formdata.QUESTION,
      "answare": formdata.ANSWARE,
      "status": true,
      "quS_ADDEDBY": studentId,
      "anS_ADDEDBY": "2",
      "addedby":  userId,
      "updatedby": userId,
      "useR_ID": userId,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }


  editDoubts(formdata:any){
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');
    var data=
    {
      "id": parseInt(formdata.ID),
      "topiC_ID": parseInt(formdata.TOPIC_ID),
      "instructurE_ID": parseInt(formdata.INSTRUCTURE_ID),
      "question":  formdata.QUESTION,
      "answare": formdata.ANSWARE,
      "status": true,
      "quS_ADDEDBY": studentId,
      "anS_ADDEDBY": "2",
      "addedby":  userId,
      "updatedby": userId,
      "useR_ID": userId,
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }



}
