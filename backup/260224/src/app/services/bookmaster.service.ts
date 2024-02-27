import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class BookmasterService {

  url=environment.baseUrl+"api/Book";

  constructor(private http: HttpClient) { }

  showBookMaster(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "booK_NAME": "string",
      "authoR_NAME": "string",
      "copies": 0,
      "racK_NO": "string",
      "isbn": "string",
      "publisher": "string",
      "edition": "string",
      "cost": 0,
      "status": true,
      "addedby": "string",
      "updatedby": "string",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addBM(formData:any){
    const userId = getFromLocalStorage('userId');
    console.log(formData.booK_NAME);
    console.log(formData.authoR_NAME);
    console.log(formData.authoR_NAME);
    console.log(formData.racK_NO);
    console.log(formData.isbn);
    console.log(formData.publisher);
    console.log(formData.edition);
    console.log(formData.cost);
    var data=
    {

      "id": 0,
      "booK_NAME": formData.booK_NAME,
      "authoR_NAME": formData.authoR_NAME,
      "copies": formData.copies,
      "racK_NO": formData.racK_NO,
      "isbn": formData.isbn,
      "publisher": formData.publisher,
      "edition": formData.edition,
      "cost": formData.cost,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "A"
    }
    // const token = localStorage.getItem("token");
    // let headers = new HttpHeaders()
    // .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json');
    //return this.http.post(this.url,data,{headers})
    return this.http.post(this.url,data)
  }

  editBM(formData:any){
    const userId = getFromLocalStorage('userId');
    // console.log(formData.ID);
    // console.log(formData.BOOK_NAME);
    // console.log(formData.AUTHOR_NAME);
    // console.log(formData.COPIES);
    // console.log(formData.racK_NO);
     console.log(formData.ISBN);
    // console.log(formData.publisher);
    // console.log(formData.edition);
    // console.log(formData.cost);
      var data=
      {
        "id": formData.ID,
        "booK_NAME": formData.BOOK_NAME,
        "authoR_NAME": formData.AUTHOR_NAME,
        "copies": formData.COPIES,
        "racK_NO": formData.RACK_NO,
        "isbn": formData.ISBN,
        "publisher": formData.PUBLISHER,
        "edition": formData.EDITION,
        "cost": formData.COST,
        "status": true,
        "addedby": userId,
        "updatedby": userId,
        "mode": "U"
      }
      // const token = localStorage.getItem("token");
      // let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer ' + token)
      // .set('Content-Type', 'application/json');
      //return this.http.post(this.url,data,{headers})
      return this.http.post(this.url,data)
    }

    statusBM(formData:any){
      const userId = getFromLocalStorage('userId');
      // console.log(formData.STATUS);
      formData.STATUS = !formData.STATUS;
      var data:any;
      data=
      {
        "id": formData.ID,
        "booK_NAME": "string",
        "authoR_NAME": "string",
        "copies": 0,
        "racK_NO": "string",
        "isbn": "string",
        "publisher": "string",
        "edition": "string",
        "cost": 0,
        "status":formData.STATUS,
        "addedby": "string",
        "updatedby": "string",
        "mode": "I"
      
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
