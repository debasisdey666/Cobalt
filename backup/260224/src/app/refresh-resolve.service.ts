import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../app/services/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshResolveService implements Resolve<any> {

  constructor(private dataService: DashboardService) {}

  resolve(): Observable<any> {
    return this.dataService.showAttendance(); // Corrected method name
  }

}
