import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Chart } from 'chart.js';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private serviceData: DashboardService) { }

  showAttend: any;
  showAtnd: any;
  ROLE_ID: any;
  showNoticeEvent: any;
  showNoteEvnt: any;
  showEvnt: any;
  swvnt: any;
  showScholarship: any;
  showScholar: any;
  showInstructor: any;
  showInstrctr: any;
  showStudentall: any;
  showStudnt: any;
  showFeescollec: any;
  showFeesc: any;

  // ngOnInit(): void {
  //   this.serviceData.showAttendance().subscribe((data)=>{
  //     this.showAttend = data;
  //     this.showAtnd = this.showAttend['Data']
  //     console.log("this.showAtnd");
  //     console.log(this.showAtnd);      
  //   })   
  // }

  ngOnInit(): void {


    this.ROLE_ID = getFromLocalStorage('ROLE_ID');


    this.serviceData.showInstructor().subscribe((data) => {
      this.showInstructor = data;
      this.showInstrctr = this.showInstructor['INSTRUCTOR_COUNT'][0].INSTRUCTOR_COUNT;
      console.log("this.showInstrctr");
      console.log(this.showInstrctr);
    });
    this.serviceData.showStudent().subscribe((data) => {
      this.showStudentall = data;
      this.showStudnt = this.showStudentall['STUDENT_COUNT'][0].STUDENT_COUNT;
      console.log("this.showStudnt count");
      console.log(this.showStudnt);
    }); 
    this.serviceData.showFeescollection().subscribe((data) => {
      this.showFeescollec = data;
      this.showFeesc = this.showFeescollec['Total_Fees_Collection'][0].Total_Fees_Collection;
      console.log("this.showFeesc collection");
      console.log(this.showFeesc);
    });


    this.serviceData.showNoticeEvent().subscribe((data) => {
      this.showNoticeEvent = data;
      this.showNoteEvnt = this.showNoticeEvent['Data'];
      console.log("this.showNoteEvnt");
      console.log(this.showNoteEvnt);
    });

    this.serviceData.showEvent().subscribe((data) => {
      this.showEvnt = data;
      this.swvnt = this.showEvnt['Data'];
      console.log("this.swvnt");
      console.log(this.swvnt);
    });

    this.serviceData.showScholarship().subscribe((data) => {
      this.showScholarship = data;
      this.showScholar = this.showScholarship['Data'];
      console.log("this.showScholar");
      console.log(this.showScholar);
    });


    this.serviceData.showAttendance().subscribe((data) => {
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
          labels: ['Present', 'Absent', 'class Pending'],
          datasets: [{
            label: '# of Votes',
            data: [
              // this.showAtnd[0].Total_Classes,
              this.showAtnd[0].classes_present,
              this.showAtnd[0].classes_absent,
              this.showAtnd[0].Class_Pending
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


  linkurl: string = environment.baseUrl;







}
