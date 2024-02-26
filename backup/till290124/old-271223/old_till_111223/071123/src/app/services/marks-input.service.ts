import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class MarksInputService {

  url=environment.baseUrl+"api/ResultUpload";

  constructor(private http: HttpClient) { }

  showMarks(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "studenT_ID": 0,
      "papeR_ID": 1,
      "score": "string",
      "result": "string",
      "appearinG_SEM": 1,
      "status": true,
      "addedby": "2",
      "updatedby": "2",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  editAY(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.userId);
      var data=
      {
        "id": formData.ID,
        "studenT_ID": 0,
        "papeR_ID": 1,
        "score": formData.SCORE,
        "result": formData.RESULT,
        "appearinG_SEM": 1,
        "status": true,
        "addedby": userId,
        "updatedby": userId,
        "mode": "U"
      }
      return this.http.post(this.url,data)
    }


}
