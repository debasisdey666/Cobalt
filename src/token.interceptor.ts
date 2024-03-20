import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // refreshTokenUrl: any;
  constructor(private http: HttpClient) {}

  refreshTokenbaseurl = environment.baseUrl + 'api/Auth/refresh-token';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const exp = localStorage.getItem('exp');
    const expAsNumber = exp ? parseInt(exp, 10) : null;

    // debugger;
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);

      if (expAsNumber !== null && tokenExpiration && Date.now() <= expAsNumber) {
        // Access token has expired; initiate token refresh
        if (refreshToken) {
          return this.refreshTokenAndHandleRequest(request, next, refreshToken);
        } else {
          // Handle the case where there's no refresh token available
          return throwError('No refresh token available');
        }
      }

      // Access token is valid; set it in the request headers
      if(localStorage.getItem('flag') === "true"){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // If the status code is 401, initiate token refresh
          console.log('status=401');

          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      console.log('refreshToken');
      return this.refreshTokenAndHandleRequest(request, next, refreshToken);
    } else {
      // Handle the case where there's no refresh token available
      return throwError('No refresh token available');
    }
  }

  private refreshTokenAndHandleRequest(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken = localStorage.getItem('refreshToken')
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const refreshTokenUrl = this.refreshTokenbaseurl;
    const requestBody = { accessToken: token, refreshToken: refreshToken };
    localStorage.setItem('flag','false');

    return this.sendRefreshTokenRequest(refreshTokenUrl, requestBody).pipe(
      // delay(2000), // Adjust the delay as needed
      switchMap((response: any) => {
        console.log('response', response);
        console.log('response.access_token', response.accessToken);
        if (response) {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('response accessToken', response.accessToken);
          console.log('response refreshToken', response.refreshToken);
          localStorage.setItem('flag','true');
          if (response.expAsNumber) {
            localStorage.setItem('exp', response.expAsNumber);
          }
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`,
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
    // Handle token refresh failure, e.g., redirect to login
    return throwError('Token refresh failed');
  }

  private getTokenExpiration(token: string): Date | null {
    // // Implement logic to extract and decode the JWT token and return the expiration date
    // const date = JSON.parse(atob(token.split('.')[1])).exp;
    // // return date;
    // const expirationTime: number = parseInt(date) * 1000; // Convert expiration time to milliseconds
    // const currentTime: number = Date.now(); // Current time in milliseconds


    // return expirationTime < currentTime;
    // const excTime: number = 2 * 60 * 1000
    // setInterval(() => {
    //   return false
    // }, excTime)
    // return true;
    // const current
    return null;
  }

  private sendRefreshTokenRequest(
    refreshTokenUrl: string,
    requestBody: any
  ): Observable<any> {
    return this.http.post(refreshTokenUrl, requestBody);
  }
}
