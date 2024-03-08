import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultInputService } from 'src/app/services/result-input.service';

@Component({
  selector: 'app-result-input',
  templateUrl: './result-input.component.html',
  styleUrls: ['./result-input.component.css']
})
export class ResultInputComponent implements OnInit {

  showRsltInp:any;
  showRsltInpAll:any;
  student_id: any;
  id: any;
  updateId: any;
  sgpa: any;
  ygpa: any;
  dgpa: any;
  formData: any = {
    sgpaDataInput: '',
    ygpaDataInput: '',
    dgpaDataInput: ''
  };
  updatedData: any;
  gradedropdwn: any;
  isSubmitted: boolean = false;
  // showInput: boolean = true
  selectedValuesFromId: any = [];
  selectedValuesFromDropdown: any = [];
  allIdArray: any = [];


  constructor(
    private serviceData:ResultInputService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.student_id = localStorage.getItem('studenId');
    this.student_id = parseInt(this.student_id);
    if(localStorage.getItem('updateId') == null || localStorage.getItem('updateId')){
      this.id = 0;
    }
    else{
      this.id = localStorage.getItem('updateId');
    }
    this.serviceData.showResultInput(this.id,this.student_id).subscribe((data)=>{
      this.showRsltInp = data;
      this.showRsltInpAll = this.showRsltInp['Results'];
      
      this.showRsltInpAll.forEach((data: any) => {
        this.allIdArray.push(data);
      })
      console.log("array123: -")
      this.allIdArray.forEach((data: any) => console.log(data));

      console.log("this.showRsltInp");
      console.log(this.showRsltInpAll);
      

      // if(this.showRsltInpAll.length != 0){ 
      //   this.showInput = true;    
      //   this.updateId = this.showRsltInpAll[0].ID;
      //   localStorage.setItem('updateId',this.updateId);
      //   console.log("this.showRsltInpAll");      
      //   console.log("this.showRsltInp");   
      //   console.log(this.showRsltInpAll); 
      
      //   if(this.showRsltInpAll[0].SGPA != 0){
      //     this.formData.sgpaDataInput = this.showRsltInpAll[0].SGPA;
      //   }
      //   if(this.showRsltInpAll[0].YGPA != 0){
      //     this.formData.ygpaDataInput = this.showRsltInpAll[0].YGPA;
      //   }
      //   if(this.showRsltInpAll[0].DGPA != 0){
      //     this.formData.dgpaDataInput = this.showRsltInpAll[0].DGPA;
      //   }
      // }
      // else{
      //   this.showInput = false;
      // }
    })

    this.serviceData.gradeDropdown().subscribe((resp:any)=>{
      this.gradedropdwn = resp['LETTER GRADE'];
      console.log("gradeDropdown")
      console.log(this.gradedropdwn)
    })

  }

 

  // saveFormData(formData: any){    
  //   debugger
  //   console.log("data");
  //   console.log(formData);
  //   const data = {
  //     "id": 4,
  //     "sgpa": formData.sgpaData,
  //     "ygpa": formData.ygpaData,
  //     "dgpa": formData.dgpaData,
  //     "updatedby": "1",
  //     "studenT_ID":6,
  //     "letterGrade": formData.ltrgrd.map((item: any) => ({
  //       id: item.ID,
  //       result: item.Letter_Grade,
  //     })),
  //     "mode": "A"
  //   };
    
  //   this.serviceData.updateStudentResult(data).subscribe((resp)=>{
  //     console.log("resp");
  //     console.log(resp);
  //   })
  // }



  // saveFormData(){
  //   if(this.formData.sgpaDataInput != '' && this.formData.ygpaDataInput != '' && this.formData.dgpaDataInput != ''){
  //     this.sgpa = parseFloat(this.formData.sgpaDataInput);
  //     this.ygpa = parseFloat(this.formData.ygpaDataInput);
  //     this.dgpa = parseFloat(this.formData.dgpaDataInput);
  //     console.log("sgpa:- "+this.sgpa);
  //     console.log("ygpa:- "+this.ygpa);
  //     console.log("dgpa:- "+this.dgpa);

  //     if (!this.isSubmitted) {
  //       // Toggle the button to confirm mode
  //       this.isSubmitted = true;
  //     }
  //     else{
  //       this.isSubmitted = false; 
  //     }
  //   }
  // }

  // updateData(){
  //   if(this.formData.sgpaDataInput != '' && this.formData.ygpaDataInput != '' && this.formData.dgpaDataInput != ''){
  //     this.serviceData.updateStudentResult(this.updateId,this.sgpa,this.ygpa,this.dgpa,this.student_id).subscribe((data: any) => {
  //     this.updatedData = data;
  //     console.log(this.updatedData)
  //     alert("submitted successfully");
  //     this.router.navigateByUrl("/dashboard");
  //   })
      
  //   }    
  // }


  saveFormData(formData: any) {   
    console.log("data");
    console.log(formData);
    const arr = Object.values(formData);
    console.log("array "+arr);
    // console.log(this.selectedValues);

    // Binding to array of objects
    
    // Check if LetterGrades is defined before trying to access it
    // if (formData.ltrgrd) {
    //     const data = {
    //         "id": 4,
    //         "sgpa": formData.sgpaData,
    //         "ygpa": formData.ygpaData,
    //         "dgpa": formData.dgpaData,
    //         "updatedby": "1",
    //         "studenT_ID": 6,
    //         "letterGrade": formData.ltrgrd.map((item: any) => ({
    //             id: item.ID,
    //             result: item.Letter_Grade,
    //         })),
    //         "mode": "A"
    //     };

    //     this.serviceData.updateStudentResult(data).subscribe((resp) => {
    //         console.log("resp");
    //         console.log(resp);
    //     });
    // } else {
    //     console.error("LetterGrades is undefined in formData.");
    // }
}



}
