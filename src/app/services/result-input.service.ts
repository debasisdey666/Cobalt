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

  showResultInput() {    
    const data = {
      "id": 0,
      "sgpa": 0,
      "ygpa": 0,
      "dgpa": 0,
      "updatedby": "string",
      "studenT_ID": 7,
      "mode": "V"
    };
    return this.http.post(this.url, data);
  }
}
