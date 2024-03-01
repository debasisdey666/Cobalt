import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentClearenceService {

  url=environment.baseUrl+"/api/AllClearance";

  constructor(private http: HttpClient) { }

  showClearence(regNumber: string){
    const data = {
      "id": 0,
      "studenT_REGISTRATION": regNumber,
      "feeS_CLEARANCE": true,
      "resulT_CLEARANCE": true,
      "librarY_CLEARANCE": true,
      "addedby": "1",
      "mode": "V"
    }
    return this.http.post(this.url, data);
  }
}
