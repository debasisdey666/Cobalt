import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  url=environment.baseUrl+"api/PaymentType";

  // userId = environment.userId;

  constructor(private http: HttpClient) { }

  showpaymentType(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "paymenT_TYPE_NAME": "string",
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

    
  addpaymentType(formData:any){ 
    const userId = getFromLocalStorage('userId');   
    var data=
    {
      "id": 0,
      "paymenT_TYPE_NAME": formData.paymenT_TYPE_NAME,
      "status": true,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }


  editpaymentType(formData:any){    
    const userId = getFromLocalStorage('userId');
    
    var data=
    {
      "ID": formData.ID,
      "paymenT_TYPE_NAME": formData.paymenT_TYPE_NAME,
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
      "paymenT_TYPE_NAME": "string",
      "status":  formData.STATUS,
      "ADDEDBY": userId,
      "UPDATEDBY": userId,
      "mode": "I"
    }
  
    // Send the POST request
    return this.http.post(this.url, data);
  }


}
