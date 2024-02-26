import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  url=environment.baseUrl+"api/ResultUpload";

  constructor(private http: HttpClient) { }

  showMarks(data: any) {
    // You can now pass the 'data' object as a parameter to the HTTP POST request
    return this.http.post(this.url, data);
  }

}
