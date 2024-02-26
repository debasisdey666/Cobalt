import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  role: any;

  canActivate( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Retrieve ROLE_ID from localStorage
    this.role = localStorage.getItem('ROLE_ID');
    if (!this.role) {
      return false;
    } else {
      return true;
    }
  }
}
