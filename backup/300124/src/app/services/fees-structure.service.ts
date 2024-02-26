import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FeeDetail } from '../../app/admin/fees-structure/fee-detail.interface';
import { getFromLocalStorage } from '../../environments/local-storage-util';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesStructureService {

  private url = environment.baseUrl + "api/FeesStructure";

  // userId = environment.userId;
  
  formDataSet: any;

  constructor(private http:HttpClient) { }

  showFeesStruc(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "collegE_ID": 0,
      "brancH_ID": 0,
      "aY_ID": 0,
      "seM_ID":0,
      "paymenT_TYPE_ID": 0,
      "feeS_GEN": 0,
      "feeS_SC": 0,
      "feeS_ST": 0,
      "feeS_OBC": 0,
      "feeS_PWD": 0,
      "feeS_EWS": 0,
      "feesdetails": [
        {
          "ledgeR_ID": 0,
          "feeS_GEN": 0,
          "feeS_SC": 0,
          "feeS_ST": 0,
          "feeS_OBC": 0,
          "feeS_PWD": 0,
          "feeS_EWS": 0
        }
      ],
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  SearchFeesStruc(formData: any){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "id": 0,
      "collegE_ID": formData.COLLEGE_ID,
      "brancH_ID": formData.BRANCH_ID,
      "aY_ID": formData.AY_ID,
      "seM_ID":formData.SEM_ID,
      "paymenT_TYPE_ID": formData.PAYMENT_TYPE_ID,
      "feeS_GEN": 0,
      "feeS_SC": 0,
      "feeS_ST": 0,
      "feeS_OBC": 0,
      "feeS_PWD": 0,
      "feeS_EWS": 0,
      "feesdetails": [
        {
          "ledgeR_ID": 0,
          "feeS_GEN": 0,
          "feeS_SC": 0,
          "feeS_ST": 0,
          "feeS_OBC": 0,
          "feeS_PWD": 0,
          "feeS_EWS": 0
        }
      ],
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }


  addFeesStruc(formData: any, feesdetails: any[]): Observable<any> {
    const userId = getFromLocalStorage('userId');
    const data = {
      id: 0,
      college_ID: parseInt(formData.COLLEGE_ID),
      branch_ID: parseInt(formData.BRANCH_ID),
      aY_ID: parseInt(formData.AY_ID),
      seM_ID: parseInt(formData.SEM_ID),
      paymenT_TYPE_ID: parseInt(formData.PAYMENT_TYPE_ID),
      feeS_GEN: 0, // Add your logic to set these values
      feeS_SC: 0,
      feeS_ST: 0,
      feeS_OBC: 0,
      feeS_PWD: 0,
      feeS_EWS: 0,
      feesdetails: feesdetails, // Pass in the feesdetails array received from your form
      status: true,
      "addedby": userId,
      "updatedby": userId,
      mode: "A"
    };
  
    return this.http.post(this.url, data);
  }
  

  
  
  

}
