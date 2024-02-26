import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeEventService {

  
  url2=environment.baseUrl+"api/NoticeEvents";

  selectedFile:any

  constructor(private http: HttpClient) { }

  showNoticeEvent(): Observable<any> {

    const userId = getFromLocalStorage('userId');
    const ROLE_ID = getFromLocalStorage('ROLE_ID');
    
    // Create a new FormData object to send form data
    const data = new FormData();

    data.append('ID', '0');
    data.append('TYPE_ID', '1');
    // data.append('ROLE', ROLE_ID);
    if (ROLE_ID !== null) {
      data.append('ROLE', ROLE_ID);
    }
    data.append('FROMDATE', '2024-02-01');
    data.append('TODATE', '2024-02-28');
    data.append('TITLE', 'string');
    data.append('DETAILS', 'string');
    if (this.selectedFile) {
      data.append('FILEPATH', this.selectedFile, this.selectedFile.name);
    }
    data.append('NEWFLAG', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'F');
    return this.http.post<any>(this.url2, data);
  }


}
