
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { CollegeService } from '../../services/college.service';
import { UniversityService } from '../../services/university.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('collegeTypeFormedit') collegeTypeFormedit!: NgForm;
  @ViewChild('colgAddForm') colgAddForm!: NgForm;
  

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
  errormessage:boolean=false;
  loading: boolean = false;

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

     // Pagination
  
     pageSize =4;
     items = [];
     pageOfItems: Array<any> | undefined;
   
     onChangePage(pageOfItems: Array<any>) {
       this.pageOfItems = pageOfItems;
     }

  // Add Data

  getColgFormdata(data:any){
    this.loading = true;
    this.serviceData.addColg(data).subscribe((resp: any)=>{
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
        this.errormessage = false;
        this.closeButton.nativeElement.click();
        this.colgAddForm.resetForm();
      }, 1000);
      this.ngOnInit();
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
    console.log(showColg.UNIVERSITY_ID)
  }

  collegeTypeFormeditdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.editCollege(data).subscribe((resp: any)=>{
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
        this.errormessage = false;
        this.closeButton2.nativeElement.click();
        this.collegeTypeFormedit.resetForm();
      }, 1000);
      this.ngOnInit();
    })  
  }

   

  // active / deactive Data

  actvinactv(showColg:any,event:Event){
    this.collegetypeUpdate= showColg;
    console.log(showColg.ID);
  }

  collegetypeFormData() {
    this.loading = true;
    this.serviceData.statusColg(this.collegetypeUpdate).subscribe(
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
