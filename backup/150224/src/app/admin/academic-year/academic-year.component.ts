import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AcademicYearService } from '../../services/academic-year.service';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('academicYrForm') academicYrForm!: NgForm;
  @ViewChild('academicYrFormedit') academicYrFormedit!: NgForm;

  resetFormValue(myForm: NgForm) {
    myForm.resetForm()
  }

  constructor(private serviceData: AcademicYearService) { }

  showAcademicYear: any;
  showACData: any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  errormessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.serviceData.showAcademicYear().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYear = this.showACData['Data'];
      console.log(this.showAcademicYear);
    })
  }


  // Pagination

  pageSize = 6;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


  // Add Data
  getAYFormdata(data: any) {
    this.loading = true;
    // this.isSubmit = true;
    this.serviceData.addAY(data).subscribe((resp: any)=>{
      console.log(resp.StatusCode);

      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage=true;  
        this.loading = false; 
      }
      else{
        this.errormessage=true;   
        this.loading = false; 
      }
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errormessage = false;
        this.closeButton.nativeElement.click();
        this.academicYrForm.resetForm();
      }, 1000);
      this.ngOnInit();

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
    this.loading = true;
    // this.isSubmit = true;
    this.serviceData.editAY(data).subscribe((resp: any)=>{
      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage=true;  
        this.loading = false; 
        this.ngOnInit();
      }
      else{
        this.errormessage=true;   
        this.loading = false; 
        this.ngOnInit();
      }
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errormessage=false; 
        this.closeButton2.nativeElement.click();
        this.academicYrFormedit.resetForm();
      }, 1000);
      this.ngOnInit();
      console.log(data);
    })
  }



  // active / deactive Data

  actvinactv(showAy: any, event: Event) {
    this.academicyrUpdate = showAy;
  }

  academicyrFormData() {
    this.loading = true; 
    this.serviceData.statusAY(this.academicyrUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.loading = false;  
        this.updateSuccessmessage = true;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton3.nativeElement.click();
        }, 1000);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
