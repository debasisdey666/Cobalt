import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ProgrammeService } from '../../services/programme.service';
import { CourseTypeService } from '../../services/course-type.service';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getProgrmForm') getProgrmForm!: NgForm;
  @ViewChild('progrmFormedit') progrmFormedit!: NgForm;

  showPgm:any;
  showCtTrue:any;
  showProgramme:any;  
  showCourseType:any;  
  showCourseTypeTrue:any;  
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;

  constructor(
    private serviceData:ProgrammeService,
    private serviceData2:CourseTypeService,
    
    ) { } 

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  ngOnInit(): void {

    this.serviceData.showProgramme().subscribe((data) => {
      this.showProgramme = data;
      this.showPgm =  this.showProgramme['Data'];
     // console.log(this.showPgm);
    })

    this.serviceData2.showCourseTypeTrue().subscribe((data=>{
      this.showCourseType=data;
      this.showCtTrue=this.showCourseType['Data'];
      console.log(this.showCtTrue);
    }));

  }

  // Pagination
  
  pageSize =3;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }


  // Add Data
  getProgrmFormdata(data: any) {    
    this.loading = true;
    // this.isSubmit = true;
    this.serviceData.addProgramme(data).subscribe((result) => {
      console.log('data');
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getProgrmForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 
    })
  }


  // edit Data

  progmUpdate = {
    ID:"",
    PROGRAMME_CODE: "",
    COURSE_TYPE: "",
    PROGRAMME_NAME: "",
    STATUS: "",
  }

  editBtn(showprgrm: any, event: Event) {
    this.progmUpdate = JSON.parse(JSON.stringify(showprgrm));
    console.log(showprgrm.ID)
  }


  progrmFormeditdata(data: any) {
    // this.isSubmit = true;
    this.loading = true;
    this.serviceData.editProgrm(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.progrmFormedit.resetForm();
      }, 1000); 
      this.ngOnInit();
      console.log(data);
    })
  }

  // active / deactive Data

  actvinactv(showprgrm:any,event:Event){
    this.progmUpdate= showprgrm;
  }

 
  
    progrmStstusFormData() {
      this.loading = true;
      this.serviceData.statusProgrm(this.progmUpdate).subscribe(
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
