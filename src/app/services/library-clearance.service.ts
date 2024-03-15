import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryClearanceService {

  url=environment.baseUrl+"api/LibraryClearance/ViewLibraryClearance";
  url2=environment.baseUrl+"api/LibraryClearance/LibraryClearance";

  constructor(private http: HttpClient) {
  }





  showStudentHistory(formData:any){
    const userId = getFromLocalStorage('userId');

    var data=
    {
      "studenT_ID":0,
      "reporT_TYPE": 1,
      "aY_ID": formData.aY_ID,
      "brancH_ID": formData.brancH_ID,
      "seM_ID": formData.seM_ID
    }


    return this.http.post(this.url,data)
  }


  submitStudentLibrary(data: any): Observable<any> {
    const endpoint = `${this.url2}`; // Replace with your actual API endpoint
    return this.http.post<any>(endpoint, data);
  }


}
