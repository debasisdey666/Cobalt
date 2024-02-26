import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class ClassTimeTableService {

  url=environment.baseUrl+"api/TimeTable";

  constructor(private http: HttpClient) { }

  showClassTimetbl(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "papeR_ID": 1,
      "clasS_OF_DATE": "10-10-2023",
      "starT_TIME": "10:00",
      "enD_TIME": "11:00",
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "instructoR_ID": 2,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addClassTimeTbl(formData:any){ 
    const userId = getFromLocalStorage('userId');   
    console.log(formData.CHAPTER_NAME);
    console.log(formData.PAPER_ID);
    var data=
    {
      "id": 0,
      "papeR_ID": formData.PAPER_ID,
      "clasS_OF_DATE": formData.CLASS_OF_DATE,
      "starT_TIME": formData.START_TIME,
      "enD_TIME": formData.END_TIME,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "instructoR_ID": formData.INSTRUCTOR_ID,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }


  
  editclassTime(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": formData.ID,
      "papeR_ID": formData.PAPER_ID,
      "clasS_OF_DATE": formData.CLASS_OF_DATE,
      "starT_TIME": formData.START_TIME,
      "enD_TIME": formData.END_TIME,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "instructoR_ID": formData.INSTRUCTOR_ID,
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }


  statusClassTimeTbl(formData: any) {
    const userId = getFromLocalStorage('userId');
    console.log(formData.STATUS);
  
    const data: any = {
      "id": formData.ID,
      "papeR_ID": 1,
      "clasS_OF_DATE": "10-10-2023",
      "starT_TIME": "10:00",
      "enD_TIME": "11:00",
      "addedby": userId,
      "updatedby": userId,
      "instructoR_ID": 2,
      "mode": "I",
      "status": !formData.STATUS // Toggle the status property
    };
  
    return this.http.post(this.url, data);
  }
  
  
}
