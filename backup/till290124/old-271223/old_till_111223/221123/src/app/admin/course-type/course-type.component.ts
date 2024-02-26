import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseTypeService} from '../../services/course-type.service'

@Component({
  selector: 'app-course-type',
  templateUrl: './course-type.component.html',
  styleUrls: ['./course-type.component.css']
})
export class CourseTypeComponent implements OnInit {

  onSubmit(myForm: NgForm) {  
    console.log(myForm.value);
    console.log(myForm.valid);      
  }

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(private serviceData:CourseTypeService) { }

  showCourseType:any;
  showCourseTypeTrue:any;
  showCtTrue:any;
  showCTData:any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;

  ngOnInit(): void {
    this.serviceData.showCourseType().subscribe((data) => {
      this.showCTData = data;
      this.showCourseType =  this.showCTData['Data'];
    })

    this.serviceData.showCourseTypeTrue().subscribe((data=>{
      this.showCourseTypeTrue=data;
      this.showCtTrue=this.showCourseTypeTrue['Data'];
      console.log(this.showCtTrue);
    }))
  }

  // Pagination
  
  pageSize =3;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

 // Add Data
 courseFormdata(data: any) {    
  this.isSubmit = true;
  this.serviceData.addCourseType(data).subscribe((result) => {
    console.log('data');
    this.addSuccessmessage = true;
    this.ngOnInit();     
    setTimeout(function () {
      window.location.reload();
    }, 500);  
  })
}

  

  // edit Data

  coursetypeUpdate = {
    "ID": 0,
    "COURSE_TYPE": "",
    "DESCRIPTION": "",
    "STATUS": "",
    "ADDEDBY": "",
    "UPDATEDBY": ""
  }

  editBtn(showCt:any,event:Event){
    this.coursetypeUpdate= JSON.parse(JSON.stringify(showCt));
    console.log(showCt.ID)
  }

  courseTypeFormeditdata(data:any){
    this.isSubmit=true;
    this.serviceData.editCT(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log(data);
    })  
  }

   

  // active / deactive Data

  actvinactv(showCt:any,event:Event){
    this.coursetypeUpdate= showCt;
    console.log(showCt.ID);
  }

  coursetypeFormData() {

    this.serviceData.statusCT(this.coursetypeUpdate).subscribe(
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
