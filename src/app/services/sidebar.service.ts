import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util'; 

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http:HttpClient) { }

  //url=environment.baseUrl+"api/Menu"
  url=environment.baseUrl+"api/RoleMenuPermission"
  // ROLE_ID = environment.ROLE_ID;

  showmenu()  {   
    const ROLE_ID = getFromLocalStorage('ROLE_ID');
    var data=
    {
      "rolE_ID": ROLE_ID,
      "type":1
    }
    return this.http.post(this.url,data)    
  }
  showmenuForRole(roleId: any)  {   
    var data=
    {
      "rolE_ID": roleId,
      "type": 2
    }
    return this.http.post(this.url,data)    
  }
}
