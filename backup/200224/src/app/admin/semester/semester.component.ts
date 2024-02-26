import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgForm} from '@angular/forms';
import { SemesterService } from '../../services/semester.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getSemForm') getSemForm!: NgForm;
  @ViewChild('semFormedit') semFormedit!: NgForm;

  showSem:any;
  showSemester:any;  
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  errormessage: boolean = false;
  loading: boolean = false;

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
      this.loading = true;
      this.serviceData.addSemester(data).subscribe((resp: any)=>{
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
          this.getSemForm.resetForm();
        }, 1000);
        this.ngOnInit(); 
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
      // this.isSubmit = true;
      this.loading = true;
      this.serviceData.editSem(data).subscribe((resp: any)=>{
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
          this.closeButton2.nativeElement.click();
          this.semFormedit.resetForm();
        }, 1000);
        this.ngOnInit(); 
        console.log(data);
      })
    }

   // active / deactive Data

   actvinactv(showsm:any,event:Event){
    this.SemUpdate= showsm;
  }

  semStstusFormData() {
    this.loading = true;
    this.serviceData.statusSem(this.SemUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        this.loading = false;
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
