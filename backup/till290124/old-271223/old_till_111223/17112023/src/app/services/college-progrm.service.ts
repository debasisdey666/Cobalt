import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class CollegeProgrmService {

  url=environment.baseUrl+"api/CollegeProgrammeMapping";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showCollegeProgrammMapping(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "collegE_ID": 1,
      "programmedetail": [
        {
          "programmE_ID": "1"
        },
    {
          "programmE_ID": "10"
        }
      ],
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }


  // addCollegeProgrammMapping(formData:any){
  //   console.log("formData.COLLEGE_ID");
  //   console.log(formData.COLLEGE_ID);
  //   console.log(formData.PROGRAMME_ID);
  //   console.log('formData.COLLEGE_ID');
  //   var data=
  //   {
  //     "id": 0,
  //     "collegE_ID": formData.COLLEGE_ID,
  //     "programmedetail": [
  //       {
  //         "programmE_ID": formData.PROGRAMME_ID,
  //       },
  //   {
  //         "programmE_ID": formData.PROGRAMME_ID,
  //       }
  //     ],
  //     "status": true,
  //     "addedby": "string",
  //     "updatedby": "string",
  //     "mode": "A"
  //   }
  //   return this.http.post(this.url,data)
  // }


  addCollegeProgrammMapping(data: any) {    
    return this.http.post(this.url, data);
  }


}
