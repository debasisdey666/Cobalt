import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  url=environment.baseUrl+"api/Chapter";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showChapter(){
    
    const userId = getFromLocalStorage('userId');

    var data=
    {
      "ID": 0,
      "CHAPTER_NAME": "YYY",
      "PAPER_ID": 1,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "V"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    // return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  addChapter(formData:any){    
    const userId = getFromLocalStorage('userId');
    console.log(formData.PAPER_ID);
    var data=
    {     
      "ID": 0,
      "CHAPTER_NAME": formData.CHAPTER_NAME,
      "PAPER_ID": formData.PAPER_ID,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "A"
      
    }
    return this.http.post(this.url,data)
  }

  editChapter(formData:any){

    console.log(formData.PAPER_ID);
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "ID": formData.ID,
      "CHAPTER_NAME": formData.CHAPTER_NAME,
      "PAPER_ID": formData.PAPER_ID,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "U"
    }
    return this.http.post(this.url,data)
  }

  statusChapter(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.STATUS);
   var data:any;
   if(formData.STATUS == false){
     data=
     {
      "ID": formData.ID,
      "CHAPTER_NAME": "",
      "PAPER_ID": 1,
      "STATUS": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "MODE": "I"
     }
   }
   else if (formData.STATUS == true){
     data=
     {
      "ID": formData.ID,
      "CHAPTER_NAME": "",
      "PAPER_ID": 1,
      "STATUS": false,
      "ADDEDBY": "1",
      "UPDATEDBY": "1",
      "MODE": "I"
     }
   }

   // const headers = new HttpHeaders({
   //   'Content-Type': 'application/json',
   // });

   // const token = localStorage.getItem("token");
   // let headers = new HttpHeaders()
   // .set('Authorization', 'Bearer ' + token)
   // .set('Content-Type', 'application/json');
   // return this.http.post(this.url,data,{headers})
   return this.http.post(this.url,data)
 }


}
