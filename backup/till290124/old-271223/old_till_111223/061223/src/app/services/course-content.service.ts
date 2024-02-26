import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  url=environment.baseUrl+"api/CourseWisePaperView";

  // userId = environment.userId;

  constructor(private http:HttpClient) { }

  showCOurseContent(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": userId,
      "mode": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

}
