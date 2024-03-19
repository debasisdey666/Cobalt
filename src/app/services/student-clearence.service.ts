import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentClearenceService {

  getUrl = environment.baseUrl+"api/MIS/checkAllClearance"
  saveUrl=environment.baseUrl+"api/AllClearance";

  constructor(private http: HttpClient) { }

  // Getting the data related to fees clearence & student clearence
  getClearence(regNumber: string, reportType: number){
    const payload = {
      "studenT_REGISTRATION": regNumber,
      "reporT_TYPE": reportType
    }
    return this.http.post(this.getUrl, payload);
  }

  // saving the data related to fees clearence & student clearence
  saveClearence(regNumber: string){
    const payload = {
      "id": 0,
      "studenT_REGISTRATION": regNumber,
      "feeS_CLEARANCE": true,
      "resulT_CLEARANCE": true,
      "librarY_CLEARANCE": true,
      "addedby": "1",
      "mode": "A"
    }
    return this.http.post(this.saveUrl, payload);
  }
  // saving the data related to fees clearence & student clearence
  getClearenceStatus(regNumber: string){
    const payload = {
      "id": 0,
      "studenT_REGISTRATION": regNumber,
      "feeS_CLEARANCE": true,
      "resulT_CLEARANCE": true,
      "librarY_CLEARANCE": true,
      "addedby": "1",
      "mode": "V"
    }
    return this.http.post(this.saveUrl, payload);
  }
}
