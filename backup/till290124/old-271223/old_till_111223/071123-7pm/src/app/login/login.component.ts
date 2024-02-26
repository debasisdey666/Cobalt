import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servicedata: LoginService, private router: Router) { }

  addLogin: any;
  addSuccessmessage: boolean = false;
  errorMessage: boolean = false;
  loading: boolean = false;
  isSubmit: boolean = false;
  err: any;
  message: any;
  ROLE_ID: any;
  firstLogin: any;
  statuscode: any;
  respon: any;
  logDetail: any;
  logUser: any;

  ngOnInit(): void {
  }

  //Add Data
  getloginFormData(data: any) {    
    this.isSubmit = true;
    this.servicedata.addLogin(data).subscribe(
      (resp) => {
        data = resp
        this.statuscode = data.Res.StatusCode;
        this.respon = data.Res.Res;
        
        if(this.statuscode == 200){

          this.logDetail = data;
          this.logUser =  this.logDetail['Data'];
          console.log("this.logUser[0].USER_ID");
          console.log(this.logUser[0].USER_ID);
          console.log("this.logUser[0].ROLE_ID");
          console.log(this.logUser[0].ROLE_ID);
          console.log(this.logDetail);

          localStorage.setItem('userId', this.logUser[0].USER_ID);
          localStorage.setItem('studenId', this.logUser[0].EMAIL);
          localStorage.setItem('userName', this.logUser[0].USER_NAME);
          localStorage.setItem('ROLE_ID', this.logUser[0].ROLE_ID);

          // if(this.logUser[0].ROLE_ID == 2){
          //   localStorage.setItem('userId', this.logUser[0].USER_ID);
          // }

          
          

           this.ngOnInit();     
            this.router.navigate(['/dashboard']);
        }
        else if(this.statuscode != 200){
          this.errorMessage = true;
       }  
      }
    )
  }
}
