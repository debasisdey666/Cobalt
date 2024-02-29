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

  constructor(private http: HttpClient) { }

  showResultInput(id:any,student_id: any) {    
    const data = {
      "id": id,
      "sgpa": 0,
      "ygpa": 0,
      "dgpa": 0,
      "updatedby": "string",
      "studenT_ID": student_id,
      "mode": "V"
    };
    return this.http.post(this.url, data);
  }
  updateStudentResult(id: any, sgpa: any, ygpa: any, dgpa: any, student_id: any) {    
    const data = {
      "id": id,
      "sgpa": sgpa,
      "ygpa": ygpa,
      "dgpa": dgpa,
      "updatedby": "string",
      "studenT_ID": student_id,
      "mode": "U"
    };
    return this.http.post(this.url, data);
  }
}
