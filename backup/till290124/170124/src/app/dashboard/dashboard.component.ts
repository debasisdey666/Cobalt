import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serviceData:DashboardService) { }

  showAttend:any;
  showAtnd:any;

  ngOnInit(): void {
    this.serviceData.showAttendance().subscribe((data)=>{
      this.showAttend = data;
      this.showAtnd = this.showAttend['Data']
      console.log("this.showAtnd");
      console.log(this.showAtnd);
      
    })
  }

}
