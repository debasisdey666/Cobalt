import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';    
import { Observable } from 'rxjs';                

@Injectable({
  providedIn: 'root'
})
export class DoubtsService {

  url=environment.baseUrl+"api/Doubts";
  url2=environment.baseUrl+"api/DropdownBind";
  
  // userId = environment.userId;
  // studentId = environment.studentId;


  constructor(private http: HttpClient) { }

 

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


  

  
  showPaperDbt(){
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": userId,
      "dropdowN_TYPE": 2,
      "aY_ID":18,
      "brancH_ID": 1,
      "seM_ID": 1
    }
    return this.http.post(this.url2,data)
  }

  // showPaperDbt(paperId: any): Observable<any> {
  //   const userId = getFromLocalStorage('userId');
  //   const data = {
  //     "useR_ID": userId,
  //     "dropdowN_TYPE": 2,
  //     "aY_ID": 18,
  //     "brancH_ID": 1,
  //     "seM_ID": 1,
  //   };

  //   return this.http.post(this.url2, data);
  // }


  showPaperDbtDropBind(selectedPaper: string): Observable<any> {
    const userId = getFromLocalStorage('userId');
    var data=
    {
      "useR_ID": userId,
      "dropdowN_TYPE": 2,
      "aY_ID":18,
      "brancH_ID": 1,
      "seM_ID": 1
    }
    return this.http.post(this.url2,data)
  }



}
