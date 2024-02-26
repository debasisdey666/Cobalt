import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FeeDetail } from '../../app/admin/fees-structure/fee-detail.interface';
import { getFromLocalStorage } from '../../environments/local-storage-util';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookissueService {

  private url=environment.baseUrl+"api/IssuedBook";
  private url2=environment.baseUrl+"api/Book";

  constructor(private http:HttpClient) { }

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
    return this.http.post(this.url2,data)
  }

  showBookIssued(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "booK_ID": 0,
      "studenT_REG": "",
      "issueD_BY": "string",
      "returN_BY": "string",
      "duE_DATE": "2024-02-28",
      "submiT_STATUS": true,
      "finE_AMOUNT": 0,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  showBookIssuedStudent(formData:any){
    const userId = getFromLocalStorage('userId');
    var bookid: any;
    if (formData.booK_ID === "") {
      bookid = 0;
    } else {
      bookid = formData.booK_ID;
    }
    var data=
    {
      "id": 0,
      "booK_ID": bookid,
      "studenT_REG": formData.studenT_REG,
      "issueD_BY": "string",
      "returN_BY": "string",
      "duE_DATE": "2024-02-28",
      "submiT_STATUS": true,
      "finE_AMOUNT": 0,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addBookIssued(formdata:any){
    const userId = getFromLocalStorage('userId');
    
    var data=
    {
      "id": 0,
      "booK_ID": formdata.booK_ID,
      "studenT_REG": formdata.studenT_REG,
      "issueD_BY": userId,
      "returN_BY": "",
      "duE_DATE": formdata.duE_DATE,
      "submiT_STATUS": false,
      "finE_AMOUNT": 0,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }

  
  returnBookIssued(formdata:any){
    const userId = getFromLocalStorage('userId');
    
    var fineamount: any;

    if(formdata.FINE_AMOUNT == ""){
      fineamount = 0
    }else{
      fineamount = formdata.FINE_AMOUNT;
    }
   
    var data=
    {
      "id": formdata.ID,
      "booK_ID": 0,
      "studenT_REG": "",
      "issueD_BY": "string",
      "returN_BY": userId,
      "duE_DATE": "2024-02-28",
      "submiT_STATUS": true,
      "finE_AMOUNT": fineamount,
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }


  stockBook(bookId: number) {
    const userId = getFromLocalStorage('userId');

    const data = {
      "id": 0,
      "booK_ID": bookId, // Set the book ID here
      "studenT_REG": "",
      "issueD_BY": "",
      "returN_BY": "",
      "duE_DATE": "2024-02-28",
      "submiT_STATUS": false,
      "finE_AMOUNT": 0,
      "mode": "F"
    };

    return this.http.post(this.url, data);
  }

  
}
