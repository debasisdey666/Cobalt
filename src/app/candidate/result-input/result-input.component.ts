import { Component, OnInit } from '@angular/core';
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
  isSubmitted: boolean = false;
  showInput: boolean = true


  constructor(
    private serviceData:ResultInputService,
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
      this.showRsltInpAll = this.showRsltInp['Data'];

      if(this.showRsltInpAll.length != 0){ 
        this.showInput = true;    
        this.updateId = this.showRsltInpAll[0].ID;
        localStorage.setItem('updateId',this.updateId);
        console.log("this.showRsltInpAll");      
        console.log("this.showRsltInp");   
        console.log(this.showRsltInpAll); 
      
        if(this.showRsltInpAll[0].SGPA != 0){
          this.formData.sgpaDataInput = this.showRsltInpAll[0].SGPA;
        }
        if(this.showRsltInpAll[0].YGPA != 0){
          this.formData.ygpaDataInput = this.showRsltInpAll[0].YGPA;
        }
        if(this.showRsltInpAll[0].DGPA != 0){
          this.formData.dgpaDataInput = this.showRsltInpAll[0].DGPA;
        }
      }
      else{
        this.showInput = false;
      }
    })
  }

  saveFormData(){
    if(this.formData.sgpaDataInput != '' && this.formData.ygpaDataInput != '' && this.formData.dgpaDataInput != ''){
      this.sgpa = parseFloat(this.formData.sgpaDataInput);
      this.ygpa = parseFloat(this.formData.ygpaDataInput);
      this.dgpa = parseFloat(this.formData.dgpaDataInput);
      console.log("sgpa:- "+this.sgpa);
      console.log("ygpa:- "+this.ygpa);
      console.log("dgpa:- "+this.dgpa);

      if (!this.isSubmitted) {
        // Toggle the button to confirm mode
        this.isSubmitted = true;
      }
      else{
        this.isSubmitted = false; 
      }
    }
  }

  updateData(){
    if(this.formData.sgpaDataInput != '' && this.formData.ygpaDataInput != '' && this.formData.dgpaDataInput != ''){
      this.serviceData.updateStudentResult(this.updateId,this.sgpa,this.ygpa,this.dgpa,this.student_id).subscribe((data: any) => {
      this.updatedData = data;
      console.log(this.updatedData)
    alert("submitted successfully");
    })
      
    }
    
  }
}
