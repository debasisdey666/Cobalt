
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { CollegeService } from '../../services/college.service';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(
    private serviceData:CollegeService,
    private serviceData2:UniversityService,
  ) { }

   showUniversity:any;
  showCollegeType:any;
  showCTData:any;
  showUnivData:any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;

  ngOnInit(): void {
    this.serviceData.showCollegeType().subscribe((data) => {
      this.showCTData = data;
      this.showCollegeType =  this.showCTData['Data'];      
    })

    this.serviceData2.showUniversityTrue().subscribe((data) => {
      this.showUnivData = data;
      this.showUniversity =  this.showUnivData['Data'];
    })

  }

  // Add Data

  getColgFormdata(data:any){
    // this.isSubmit=true;
    this.serviceData.addColg(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log("data");
      console.log(data);
    })  
  }

   // edit Data

   collegetypeUpdate = {

      "COLLEGE_CODE": "",
      "ID":"",
      "COLLEGE_NAME": "",
      "UNIVERSITY_ID": "",
      "STATUS": true,
      "ADDEDBY": "1",
      "UPDATEDBY": "1"
  }

  editBtn(showColg:any,event:Event){
    this.collegetypeUpdate= JSON.parse(JSON.stringify(showColg));
    console.log(showColg.ID)
  }

  collegeTypeFormeditdata(data:any){
    this.isSubmit=true;
    this.serviceData.editCollege(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log(data);
    })  
  }

   

  // active / deactive Data

  actvinactv(showColg:any,event:Event){
    this.collegetypeUpdate= showColg;
    console.log(showColg.ID);
  }

  collegetypeFormData() {

    this.serviceData.statusColg(this.collegetypeUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        setTimeout(function () {
          window.location.reload();
        }, 500);
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }
}
