import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class LedgerService {


  url=environment.baseUrl+"api/Ledger";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showledger(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "ledgeR_NAME": "string",
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addledger(formData:any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "ledgeR_NAME": formData.ledgeR_NAME,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }

  editLedger(formData:any){ 
    const userId = getFromLocalStorage('userId');  
    
    var data=
    {
      "id":  formData.ID,
      "ledgeR_NAME": formData.ledgeR_NAME,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "U"
    }
    return this.http.post(this.url,data)
  }

  statuspaytyp(formData: any) {
    const userId = getFromLocalStorage('userId');
    // Toggle the STATUS property
    formData.STATUS = !formData.STATUS;
  
    // Create the data object
    const data = {
      "ID": formData.ID,
      "ledgeR_NAME": "string",
      "status": formData.STATUS,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "I"
    }
  
    // Send the POST request
    return this.http.post(this.url, data);
  }


}
