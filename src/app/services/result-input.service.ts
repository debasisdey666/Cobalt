import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class ResultInputService {

  url=environment.baseUrl+"api/Result";
  url2=environment.baseUrl+"api/DropdownBind";

  constructor(private http: HttpClient) { }

  showResultInput(id:any,student_id: any) {    
    const data = {
      "id": 0,
      "sgpa": 0,
      "ygpa": 0,
      "dgpa": 0,
      "updatedby": "string",
      "studenT_ID":6,
      "letterGrade": [
        {
          "id": 0,
          "result": "string"
        }
      ],
      "mode": "V"

    };
    return this.http.post(this.url, data);
  }




  updateStudentResult(data:any) {   
    return this.http.post(this.url, data);
  }

  

  gradeDropdown(){
    const data = {  
      "useR_ID": 0,
      "dropdowN_TYPE": 5,
      "aY_ID": 0,
      "brancH_ID": 0,
      "seM_ID": 0
    }
    return this.http.post(this.url2, data);
  }

}
