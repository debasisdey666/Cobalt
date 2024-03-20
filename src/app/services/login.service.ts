import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  url=environment.baseUrl+"api/Auth/Login";
  refreshTokenUrl = environment.baseUrl+"api/Auth/refresh-token"

  addLogin(formData:any){
    console.log(formData.useR_NAME);
    console.log(formData.password);
    var data=
    {
      useR_NAME: formData.useR_NAME,
      password: formData.password,
    }
    return this.http.post(this.url, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle and log the error here
    console.error('An error occurred:', error);
    // You can return a user-friendly error message or throw an exception as needed
    return throwError('An error occurred. Please try again later.');
  }

  getToken(){
    return localStorage.getItem('token') || ''
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken') || ''
  }
  generateRefreshToken(){
    debugger
    let payload = {
      "accessToken": this.getToken(),
      "refreshToken": this.getRefreshToken()
    }
    return this.http.post(this.refreshTokenUrl, payload);
  }
  saveTokens(tokendata: any){
    localStorage.setItem("token", tokendata.accessToken);
    localStorage.setItem("refreshToken", tokendata.refreshToken);
  }
}
