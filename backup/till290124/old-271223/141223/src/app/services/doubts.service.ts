import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';                    

@Injectable({
  providedIn: 'root'
})
export class DoubtsService {

  url=environment.baseUrl+"api/Doubts";
  
  // userId = environment.userId;
  // studentId = environment.studentId;


  constructor(private http: HttpClient) { }

  // showDoubts(){
  //   const userId = getFromLocalStorage('userId');
  //   const studentId = getFromLocalStorage('studentId');
  //   var data=
  //   {
  //     "id": 0,
  //     "topiC_ID": 0,
  //     "instructurE_ID": 0,
  //     "question": "string",
  //     "answare": "string",
  //     "status": true,
  //     "quS_ADDEDBY": userId,
  //     "anS_ADDEDBY": "0",
  //     "addedby":  userId,
  //     "updatedby": userId,
  //     "useR_ID": userId,
  //     "DOUBT_DOCUMENT_PATH": "userId",
  //     "mode": "V"
  //   }
  //   return this.http.post(this.url,data)
  // }

  // addDoubts(formdata:any){
  //   const userId = getFromLocalStorage('userId');
  //   const studentId = getFromLocalStorage('studentId');
  //   var data=
  //   {
  //     "id": 0,
  //     "topiC_ID": parseInt(formdata.TOPIC_ID),
  //     "instructurE_ID": parseInt(formdata.INSTRUCTURE_ID),
  //     "question":  formdata.QUESTION,
  //     "answare": formdata.ANSWARE,
  //     "status": true,
  //     "quS_ADDEDBY": studentId,
  //     "anS_ADDEDBY": "2",
  //     "addedby":  userId,
  //     "updatedby": userId,
  //     "useR_ID": userId,
  //     "mode": "A"
  //   }
  //   return this.http.post(this.url,data)
  // }

  selectedFile: any;
  selectedFile2: any;
  showDoubts() {
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studentId');
    
    // Create FormData
    const data = new FormData();
  
    // Append form fields to FormData
    data.append('id', '0');
    data.append('topiC_ID', '0');
    data.append('instructurE_ID', '0');
    data.append('question', 'string');
    data.append('answare', 'string');
    data.append('status', 'true');
    data.append('quS_ADDEDBY', userId !== null ? userId.toString() : '');
    data.append('anS_ADDEDBY', userId !== null ? userId.toString() : '');
    data.append('addedby', userId !== null ? userId.toString() : '');
    data.append('updatedby', userId !== null ? userId.toString() : '');
    data.append('useR_ID', userId !== null ? userId.toString() : '');
  
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('DOUBT_DOCUMENT_PATH', this.selectedFile, this.selectedFile.name);
    }
  
    data.append('mode', 'V');
  
    // Make the HTTP POST request
    return this.http.post(this.url, data);
  }


  // editDoubts(formdata:any){
  //   const userId = getFromLocalStorage('userId');
  //   const studentId = getFromLocalStorage('studentId');
  //   var data=
  //   {
  //     "id": parseInt(formdata.ID),
  //     "topiC_ID": parseInt(formdata.TOPIC_ID),
  //     "instructurE_ID": parseInt(formdata.INSTRUCTURE_ID),
  //     "question":  formdata.QUESTION,
  //     "answare": formdata.ANSWARE,
  //     "status": true,
  //     "quS_ADDEDBY": studentId,
  //     "anS_ADDEDBY": "2",
  //     "addedby":  userId,
  //     "updatedby": userId,
  //     "useR_ID": userId,
  //     "mode": "U"
  //   }
  //   return this.http.post(this.url,data)
  // }


  // editDoubts(formdata: any) {
  //   const userId = getFromLocalStorage('userId');
  //   const studentId = getFromLocalStorage('studenId');
  
  //   // Create FormData
  //   const data = new FormData();
  
  //   // Append form fields to FormData
  //   data.append('id', formdata.ID);
  //   data.append('topiC_ID', formdata.TOPIC_ID);
  //   data.append('instructurE_ID', formdata.INSTRUCTURE_ID);
  //   data.append('question', formdata.QUESTION);
  //   data.append('answare', formdata.ANSWARE);
  //   data.append('status', 'true');
  //   data.append('quS_ADDEDBY', studentId !== null ? studentId.toString() : '');
  //   data.append('anS_ADDEDBY', '2');
  //   data.append('addedby', userId !== null ? userId.toString() : '');
  //   data.append('updatedby', userId !== null ? userId.toString() : '');
  //   data.append('useR_ID', userId !== null ? userId.toString() : '');
  //   data.append('mode', 'U');
  
  //   // Check if a file is selected before adding it to FormData
  //   if (this.selectedFile2) {
  //     data.append('DOUBT_DOCUMENT_PATH', this.selectedFile2, this.selectedFile2.name);
  //   }
  
  //   // Make the HTTP POST request
  //   return this.http.post(this.url, data);
  // }



}
