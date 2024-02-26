import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AcademicYearService } from '../../services/academic-year.service';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {



  resetFormValue(myForm: NgForm) {
    myForm.resetForm()
  }

  constructor(private serviceData: AcademicYearService) { }

  showAcademicYear: any;
  showACData: any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;

  ngOnInit(): void {
    this.serviceData.showAcademicYear().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYear = this.showACData['Data'];
      console.log(this.showAcademicYear);
    })
  }


  // Pagination

  pageSize = 3;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


  // Add Data
  getAYFormdata(data: any) {
    this.isSubmit = true;
    this.serviceData.addAY(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function () {
        window.location.reload();
      }, 500);

      console.log(data);
    })
  }

  // edit Data

  academicyrUpdate = {
    ID: "",
    STATUS: "",
    AY_CODE: "",
    AY: ""
  }

  editBtn(showAy: any, event: Event) {
    this.academicyrUpdate = JSON.parse(JSON.stringify(showAy));
    console.log(showAy.ID)
  }


  academicYrFormeditdata(data: any) {
    this.isSubmit = true;
    this.serviceData.editAY(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function () {
        window.location.reload();
      }, 500);
      console.log(data);
    })
  }



  // active / deactive Data

  actvinactv(showAy: any, event: Event) {
    this.academicyrUpdate = showAy;
  }

  academicyrFormData() {

    this.serviceData.statusAY(this.academicyrUpdate).subscribe(
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
