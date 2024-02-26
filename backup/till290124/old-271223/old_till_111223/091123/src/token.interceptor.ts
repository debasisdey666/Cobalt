import { Injectable } from '@angular/core'; 
// import { DatePipe } from '@angular/common';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, timestamp } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    // private datePipe: DatePipe
    ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const exp = localStorage.getItem('exp');
    const expAsNumber = exp ? parseInt(exp, 10) : null; 
    console.log('exp');
    console.log(exp);
    

    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);

      console.log(new Date());

      
    //   console.log(this.convertTimestampToDateTime(exp));

    // if (expAsNumber !== null) {
    //     console.log(this.convertTimestampToDateTime(expAsNumber));
    //   } else {
    //     console.log('Invalid or missing timestamp'); // Handle the case where 'exp' is null
    //   }
      console.log(new Date())

      // Check if the access token is expired
      if (tokenExpiration && tokenExpiration <= new Date()) {
      // if (tokenExpiration && tokenExpiration) {
        console.log("token expiration");        
        // Access token has expired; initiate token refresh
        if (refreshToken) {
          return this.refreshTokenAndHandleRequest(request, next, refreshToken);
        } else {
          // Handle the case where there's no refresh token available
          return next.handle(request);
        }
      }

      // Access token is valid; set it in the request headers
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
  

  private refreshTokenAndHandleRequest(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken= localStorage.getItem('refreshToken')
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    const refreshTokenUrl = 'http://89.117.62.190/COBALT/api/Auth/refresh-token'; // Specify the URL of the token refresh endpoint
    const requestBody = { accessToken:token, refreshToken:refreshToken };

    // Call the method to send the refresh token request to the specific endpoint
    return this.sendRefreshTokenRequest(refreshTokenUrl, requestBody).pipe(
      switchMap((response: any) => {
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.access_token}`,
            },
          });
          return next.handle(request);
        } else {
          return this.handleTokenRefreshFailure();
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private handleTokenRefreshFailure(): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>();
  }

  private handleTokenExpiration(): Observable<HttpEvent<any>> {
    return new Observable<HttpEvent<any>>();
  }

  private getTokenExpiration(token: string): Date | null {
    return null; // Replace with actual logic to extract and decode the JWT token
  }

  // Method to send the refresh token request
  private sendRefreshTokenRequest(refreshTokenUrl: string, requestBody: any): Observable<any> {
    return this.http.post(refreshTokenUrl, requestBody);
  }

//   convertTimestampToDateTime(timestamp: number): string {
//     const formattedDate = this.datePipe.transform(new Date(timestamp * 1000), 'dd/MM/yyyy HH:mm:ss');
//     return formattedDate || 'Invalid Date'; // Handle the case where the date is invalid
//   }

}
