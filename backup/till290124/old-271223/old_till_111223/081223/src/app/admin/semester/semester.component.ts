import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { SemesterService } from '../../services/semester.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  showSem:any;
  showSemester:any;  
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(private serviceData:SemesterService) { } 

  ngOnInit(): void {
    this.serviceData.showSemester().subscribe((data) => {
      this.showSemester = data;
      this.showSem =  this.showSemester['Data'];
      console.log(this.showSem);
    })
  }

   // Pagination
  
   pageSize =6;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }


    // Add Data
    getSemFormdata(data: any) {
      this.isSubmit = true;
      this.serviceData.addSemester(data).subscribe((result) => {
        this.addSuccessmessage = true;
        this.ngOnInit();
        setTimeout(function () {
          window.location.reload();
        }, 500);  
        console.log(data);
      })
    }


    // edit Data

    SemUpdate = {
      ID:"",
      SEM_CODE: "",
      SEM: "",
      STATUS: "",
      SEM_TYPE: "",
    }


    editBtn(showsm: any, event: Event) {
      this.SemUpdate = JSON.parse(JSON.stringify(showsm));
      console.log(showsm.SEM_TYPE)
    }
  
  
    semFormeditdata(data: any) {
      this.isSubmit = true;
      this.serviceData.editSem(data).subscribe((result) => {
        this.addSuccessmessage = true;
        this.ngOnInit();
        setTimeout(function () {
          window.location.reload();
        }, 500);
        console.log(data);
      })
    }

   // active / deactive Data

   actvinactv(showsm:any,event:Event){
    this.SemUpdate= showsm;
  }

  semStstusFormData() {

    this.serviceData.statusSem(this.SemUpdate).subscribe(
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
