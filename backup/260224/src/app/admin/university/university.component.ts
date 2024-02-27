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
  @ViewChild('closeButton3') closeButton3!: ElementRef;
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
  errormessage:boolean=false;
  loading: boolean = false;

  ngOnInit(): void {
    this.serviceData.showUniversity().subscribe((data) => {
      this.showUnvData = data;
      this.showUniversity =  this.showUnvData['Data'];
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

   getUnvFormdata(data:any){
    this.loading = true;
    this.serviceData.addUnv(data).subscribe((resp: any)=>{

      console.log(resp);
      console.log(resp.Res.StatusCode);

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
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errormessage=false;   
        this.closeButton.nativeElement.click();
        this.universityAddForm.resetForm();
      }, 1500);

      this.ngOnInit();
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
    this.serviceData.editUnv(data).subscribe((resp: any)=>{
      
      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage=true;  
        this.loading = false; 
      }
      else{
        this.errormessage=true;   
        this.loading = false; 
      }

      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errormessage=false;   
        this.closeButton2.nativeElement.click();
        this.universityFormedit.resetForm();
      }, 1500);
      this.ngOnInit();
    })  
  }

  // active / deactive Data

  actvinactv(showUnv:any,event:Event){
    this.universityUpdate= showUnv;
    console.log(showUnv.ID);
  }

  universityFormData() {
    this.loading = true;
    this.serviceData.statusUniv(this.universityUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        this.loading = false;
        this.loading = false;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton3.nativeElement.click();
          //this.universityForm.resetForm();
        }, 1000);
        this.ngOnInit();
        // setTimeout(function () {
        //   window.location.reload();
        // }, 500);
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
