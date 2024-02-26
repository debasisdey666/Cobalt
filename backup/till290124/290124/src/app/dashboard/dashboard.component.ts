import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Chart } from 'chart.js';
import { getFromLocalStorage } from '../../environments/local-storage-util'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serviceData:DashboardService) { }

  showAttend:any;
  showAtnd:any;
  ROLE_ID:any;

  // ngOnInit(): void {
  //   this.serviceData.showAttendance().subscribe((data)=>{
  //     this.showAttend = data;
  //     this.showAtnd = this.showAttend['Data']
  //     console.log("this.showAtnd");
  //     console.log(this.showAtnd);      
  //   })   
  // }

  ngOnInit(): void {

    
    this.ROLE_ID= getFromLocalStorage('ROLE_ID');

    this.serviceData.showAttendance().subscribe((data)=>{
          this.showAttend = data;
          this.showAtnd = this.showAttend['Data']
          console.log("this.showAtnd");
          console.log(this.showAttend);      
          console.log("this.showAtnd.Total_Classes");      
          console.log(this.showAtnd[0].Total_Classes);      
          console.log("this.showAtnd.classes_Not_Taken");      
          console.log(this.showAtnd[0].classes_Not_Taken);      
    



    var myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
          labels: ['Present', 'Absent', 'class Canceled'],
          datasets: [{
              label: '# of Votes',
              data: [ 
                // this.showAtnd[0].Total_Classes,
                this.showAtnd[0].classes_present,
                this.showAtnd[0].classes_absent,
                this.showAtnd[0].classes_cancelled
              ],
              backgroundColor: [
                  
                  // 'rgb(54, 162, 235)',               
                  'rgb(117, 166, 42)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 205, 86)'
              ],
              borderColor: [
                // 'rgb(54, 162, 235)',               
                'rgb(117, 166, 42)',
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)'
              ],
              borderWidth: 1
          }]
      }
  });


})  


  }




  
  

}
