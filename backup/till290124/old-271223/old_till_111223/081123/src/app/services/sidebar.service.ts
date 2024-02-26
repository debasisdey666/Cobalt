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

    // var data=
    // {
    //   "rpM_ID": 0,
    //   "rolE_ID": 1,
    //   "menU_ID": 0,
    //   "status": true,
    //   "addedby": "string",
    //   "updatedby": "string",
    //   "mode": "V"
    //   }

    var data=
    {
      "rolE_ID": ROLE_ID
      }

    
     const token = localStorage.getItem("token");
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', 'application/json');

    // let vdata =  this.http.post(this.url,data,{headers})
    // console.log(vdata);
    return this.http.post(this.url,data,{headers})
    
  }

 
}
