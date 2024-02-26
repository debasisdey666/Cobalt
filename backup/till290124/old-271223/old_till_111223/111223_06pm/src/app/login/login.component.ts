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
  name: any;
  addSuccessmessage: boolean = false;
  errorMessage: boolean = false;
  loading: boolean = false;
  isSubmit: boolean = false;
  err: any;
  message: any;
  ROLE_ID: any;
  role: any;
  firstLogin: any;
  statuscode: any;
  respon: any;
  logDetail: any;
  logUser: any;

  ngOnInit(): void { }





  getloginFormData(data: any) {
    this.loading = true;
    this.servicedata.addLogin(data).subscribe(
      (resp: any) => { // Specify the type of 'resp' as 'any' for now
        this.loading = false;
        console.log("resp");
        console.log(resp);
  
        // Make sure the structure of 'resp' matches your expectation
        const token = resp.token; // Access the 'token' property
        const refreshToken = resp.refreshToken; // Access the 'token' property
  
        const x = this.parseJwt(token);
        
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        console.log("x.role");
        console.log(x.id);
        
  
        if (x) {
          localStorage.setItem("token_parse", JSON.stringify(x));
  
          // Access the properties of the parsed JWT as needed
          const id = x.id;
          const role = x.Role;
          const exp = x.exp;
          const userName = x.name;
          const firstLogin = x.FirstLogin;

          localStorage.setItem('userId', id);
          // localStorage.setItem('studenId', this.logUser[0].EMAIL);
          localStorage.setItem('userName', userName);
          localStorage.setItem('ROLE_ID', role);                      
          localStorage.setItem('studenId', '0');
          localStorage.setItem('exp', exp);

          this.router.navigate(['/dashboard']);
  
          // Example: Redirect based on the 'ROLE_ID' from the JWT
          // if (role == 2) {

          //   console.log("role");
          //   console.log("2");
            
          //   this.router.navigate(['/dashboard']);
          // } else if (role == 1) {
          //   this.router.navigate(['/dashboard']);
          //   console.log("role");
          //   console.log("role", role);
          // } else {
          //   console.log("role");
          //   console.log("else");
          // }
        }
      },
      (err) => {
        this.loading = false;
                  console.log(err);
        this.message = err.error.message;
        this.errorMessage = true;
      }
    );
  }
  
  parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64));
  
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null; // Handle the error as needed
    }
  }
  




}
