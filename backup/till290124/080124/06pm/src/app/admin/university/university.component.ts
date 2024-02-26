import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('universityAddForm') universityAddForm!: NgForm;
  @ViewChild('universityFormedit') universityFormedit!: NgForm;

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(private serviceData:UniversityService ) { }
  showUniversity:any;
  showUnvData:any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  loading: boolean = false;

  ngOnInit(): void {
    this.serviceData.showUniversity().subscribe((data) => {
      this.showUnvData = data;
      this.showUniversity =  this.showUnvData['Data'];
    })
  }

   // Pagination
  
   pageSize =4;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }

   // Add Data

   getUnvFormdata(data:any){
    this.loading = true;
    this.serviceData.addUnv(data).subscribe((result)=>{
      this.addSuccessmessage=true;     
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.universityAddForm.resetForm();
      }, 1000);

      this.ngOnInit();
    //   setTimeout(function() {
    //     window.location.reload();
    // }, 500);
      console.log(data);
    })  
  }

  // edit Data

  universityUpdate = {
    "ID":  0,
    "UNIVERSITY_CODE": "",
    "UNIVERSITY_NAME": "",
    "STATUS": "",
    "ADDEDBY": "",
    "UPDATEDBY": ""
  }

  editBtn(showUnv:any,event:Event){
    this.universityUpdate= JSON.parse(JSON.stringify(showUnv));
    console.log(showUnv.ID)    
  }

  universityFormeditdata(data:any){
    this.loading = true;
    this.serviceData.editUnv(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.universityFormedit.resetForm();
      }, 1000);
      this.ngOnInit();
    //   this.ngOnInit();
    //   setTimeout(function() {
    //     window.location.reload();
    // }, 500);
      console.log(data);
    })  
  }

  // active / deactive Data

  actvinactv(showUnv:any,event:Event){
    this.universityUpdate= showUnv;
    console.log(showUnv.ID);
  }

  universityFormData() {

    this.serviceData.statusUniv(this.universityUpdate).subscribe(
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
