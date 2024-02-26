import { Component, OnInit } from '@angular/core';
import { MisService } from '../services/mis.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css']
})
export class StudentHistoryComponent implements OnInit {

  showStudentDetails:any;
  showStudetail:any;
  linkurl: string =environment.baseUrl;

  constructor(
    private serviceData: MisService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    const studentID = +this.route.snapshot.params['ID'];
    
    this.serviceData.showStudDetails(studentID).subscribe((data) => {
      this.showStudentDetails = data;
      this.showStudetail = this.showStudentDetails['Student_History'];
      console.log("this.showStudetail");
      console.log(studentID);
      console.log(this.showStudetail);
    })
    
  }
}

