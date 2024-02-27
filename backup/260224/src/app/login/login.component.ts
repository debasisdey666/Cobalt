import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private servicedata: LoginService, 
    private router: Router,
    private serviceData: ProfileService
    ) { }

  addLogin: any;
  name: any;
  showStudentData: any;
  showStudent: any;
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
  username: any;

  isReloaded: boolean = false;

  ngOnInit(): void { 

      
  }

  
  


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
        const username = data.useR_NAME;
        localStorage.setItem('username', username);        
  
        if (x) {
          localStorage.setItem("token_parse", JSON.stringify(x));
  
          // Access the properties of the parsed JWT as needed
          const id = x.id;
          const role = x.Role;
          const exp = x.exp;
          // const userName = x.name;
          const firstLogin = x.FirstLogin;

          localStorage.setItem('userId', id);
          localStorage.setItem('ROLE_ID', role);  
          localStorage.setItem('exp', exp);          

          this.router.navigate(['/dashboard']);      

          this.serviceData.showStudentDetails().subscribe((data) => {
            this.showStudentData = data;
            this.showStudent =  this.showStudentData['Data'];
           console.log('this.showStudent from login');
           console.log('id', this.showStudent);
           console.log('id', this.showStudent[0].ID);
          //  console.log('CURRENT_SEM', this.showStudent[0].CURRENT_SEM);
           localStorage.setItem('CURRENT_SEM', this.showStudent[0].CURRENT_SEM);
           localStorage.setItem('BRANCH_ID', this.showStudent[0].BRANCH_ID);
           localStorage.setItem('CURRENT_AY', this.showStudent[0].CURRENT_AY);
           localStorage.setItem('CATEGORY_ID', this.showStudent[0].CATEGORY_ID);
           localStorage.setItem('COLLEGE_ID', this.showStudent[0].COLLEGE_ID);
           localStorage.setItem('SEM', this.showStudent[0].SEM);
          //  localStorage.setItem('STUDENT_REGISTRATION', this.showStudent[0].STUDENT_REGISTRATION);

        
          })

        }
      },
      (err) => {
        this.loading = false;
        //  console.log("err");
        // this.message = err.title;
        this.errorMessage = true;
        // console.log("this.message");
        // console.log(this.message);
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
  
  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Perform actions after route change and page load
        // This code will be executed after each successful route navigation
        location.reload();
      });
  }

}
