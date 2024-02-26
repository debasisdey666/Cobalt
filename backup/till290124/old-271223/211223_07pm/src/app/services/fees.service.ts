import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { getFromLocalStorage } from '../../environments/local-storage-util';  

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  private url = environment.baseUrl + "api/StudentFeesPayment";
  private url2 = environment.baseUrl+"api/StudentDetails";

  // userId = environment.userId;

  selectedFile: any;
  selectedFile2: any;

  constructor(private http:HttpClient) { }

  showStudentDetails() {
    const userId = getFromLocalStorage('userId');
    // Create a new FormData object to send form data
    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', '0');
    data.append('STUDENT_REGISTRATION', '0');
    data.append('STUDENT_NAME', '0');
    data.append('REGISTRATION_YEAR', '0');
    data.append('BRANCH_ID', '0');
    data.append('CURRENT_AY', '0');
    data.append('CURRENT_SEM', '0');
    data.append('COLLEGE_ID', '0');
    data.append('FATHER_NAME', '0');
    data.append('MOTHER_NAME', '0');
    data.append('PH_NUMBER', '0');
    data.append('EMAIL', '0');
    data.append('ADHAAR_NO', '0');
    data.append('DOB', '1990-10-30');
    data.append('ADDRESS', '0');
    data.append('STATE', '0');
    data.append('DISTRICT', '0');
    data.append('PINCODE', '0');
    data.append('GENDER', '0');
    data.append('CATEGORY', '0');
    data.append('IS_PWD', 'true');
    data.append('MARITAL_STATUS', 'true');
    
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('PHOTO_PATH', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile2) {
      data.append('SIGNATURE_PATH', this.selectedFile2, this.selectedFile2.name);
    }
    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'V');
    // Send a POST request with the FormData
    return this.http.post<any>(this.url2, data);
  }

  showFeess(formData: any){
    const userId = getFromLocalStorage('userId');
    const studenId = getFromLocalStorage('studenId');
    const BRANCH_ID = getFromLocalStorage('BRANCH_ID');
    const COLLEGE_ID = getFromLocalStorage('COLLEGE_ID');
    const CURRENT_AY = getFromLocalStorage('CURRENT_AY');
    const CURRENT_SEM = getFromLocalStorage('CURRENT_SEM');
    const CATEGORY_ID = getFromLocalStorage('CATEGORY_ID');
    console.log("formData.PAYMENT_TYPE_ID")
    console.log(formData.PAYMENT_TYPE_ID)
    var data=
    // {
    //   "id": 0,
    //   "studenT_ID": 6,
    //   "collegE_ID": 1,
    //   "brancH_ID": 1,
    //   "categorY_ID": 1,
    //   "aY_ID": 18,
    //   "seM_ID": 1,
    //   "paymenT_TYPE_ID": formData.PAYMENT_TYPE_ID,
    //   "paymenT_AMOUNT": 0,
    //   "totaL_AMOUNT_PAID": 0,
    //   "paymenT_STATUS": 0,
    //   "paymenT_DATE": "2023-10-11",
    //   "amount": 0,
    //   "status": true,
    //   "addedby": userId,
    //   "updatedby":userId,
    //   "referencE_NO": "string",
    //   "mode": "V"
    // }
    {
      "id": 0,
      "studenT_ID": studenId,
      "collegE_ID": COLLEGE_ID,
      "brancH_ID": BRANCH_ID,
      "categorY_ID": CATEGORY_ID,
      "aY_ID": CURRENT_AY,
      "seM_ID": CURRENT_SEM,
      "paymenT_TYPE_ID": formData.PAYMENT_TYPE_ID,
      "paymenT_AMOUNT": 0,
      "totaL_AMOUNT_PAID": 0,
      "paymenT_STATUS": 0,
      "paymenT_DATE": "2023-10-11",
      "amount": 0,
      "status": true,
      "addedby": userId,
      "updatedby":userId,
      "referencE_NO": "string",
      "mode": "V"
    }
    return this.http.post(this.url,data)
  }

  addFees(formdata:any){
    const userId = getFromLocalStorage('userId');
    const studenId = getFromLocalStorage('studenId');
    console.log("formdata.COLLEGE_ID");
    console.log(formdata.PAYMENT_DATE);
    console.log(formdata.BRANCH_ID);
    console.log(formdata.CATEGORY_ID);
    console.log(formdata.AY_ID);
    var data=
    {
      "id": 0,
      "studenT_ID": studenId,
      "collegE_ID": formdata.COLLEGE_ID,
      "brancH_ID": formdata.BRANCH_ID,
      "categorY_ID": formdata.CATEGORY_ID,
      "aY_ID": formdata.AY_ID,
      "seM_ID": formdata.SEM_ID,
      "paymenT_TYPE_ID": formdata.PAYMENT_TYPE_ID,
      "paymenT_AMOUNT":formdata.PAYMENT_AMOUNT,
      "totaL_AMOUNT_PAID": formdata.TOTAL_AMOUNT_PAID,
      "paymenT_STATUS": 1,
      "paymenT_DATE": formdata.PAYMENT_DATE,
      "amount": formdata.AMOUNT,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "referencE_NO": "string",
      "mode": "A"
    }
    return this.http.post(this.url,data)
  }
}
