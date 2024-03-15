import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultInputService } from 'src/app/services/result-input.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util'; 

@Component({
  selector: 'app-result-input',
  templateUrl: './result-input.component.html',
  styleUrls: ['./result-input.component.css']
})
export class ResultInputComponent implements OnInit {

  showRsltInp: any;
  showRsltInpAll: any;
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
  addSuccessmessage:boolean = false;
  errorMessage:boolean = false;
  loading:boolean = false;
  // showInput: boolean = true
  selectedValuesFromId: any = [];
  selectedValuesFromDropdown: any = [];
  allIdArray: any = [];
  resultArray: any = [];


  constructor(
    private serviceData: ResultInputService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.student_id = localStorage.getItem('studenId');
    this.student_id = parseInt(this.student_id);
    if (localStorage.getItem('updateId') == null || localStorage.getItem('updateId')) {
      this.id = 0;
    }
    else {
      this.id = localStorage.getItem('updateId');
    }
    this.serviceData.showResultInput(this.id, this.student_id).subscribe((data) => {
      this.showRsltInp = data;
      this.showRsltInpAll = this.showRsltInp['Results'];
       console.log(this.showRsltInpAll);
      // this.showRsltInpAll.forEach((data: any) => console.log(data));

      this.showRsltInpAll[0].LetterGrades.forEach((data: any) => {
        this.allIdArray.push(data.ID);
        this.selectedValuesFromDropdown.push(data.RESULT);
      })
      
      this.formData.ID = this.showRsltInpAll[0].ID;
      this.formData.sgpaDataInput = this.showRsltInpAll[0].SGPA;
      this.formData.ygpaDataInput = this.showRsltInpAll[0].YGPA;
      this.formData.dgpaDataInput = this.showRsltInpAll[0].DGPA;
    })

    this.serviceData.gradeDropdown().subscribe((resp: any) => {
      this.gradedropdwn = resp['LETTER GRADE'];
    })

  }




  saveFormData(formData: any) {
    this.loading = true; 
    this.resultArray=[]
    this.allIdArray.forEach((key: any, index: any) => {
      // Create an object with the current key from keysArray and corresponding value from valuesArray
      let obj = {};
      obj = {
        id: key,
        result: this.selectedValuesFromDropdown[index]
      }

      // Push the object into the resultArray
      this.resultArray.push(obj);
      
    });

      this.resultArray.forEach((data: any) => console.log(data));
      const studentId = getFromLocalStorage('studentId');
    const data = {
      "id":formData.ID,
      "sgpa": parseFloat(formData.sgpaData),
      "ygpa": parseFloat(formData.ygpaData),
      "dgpa": parseFloat(formData.dgpaData),
      "updatedby": "1",
      "studenT_ID": 6,
      "letterGrade": this.resultArray,
      "mode": "U"
    };
    this.serviceData.updateStudentResult(data).subscribe((resp: any) => {
      
      this.addSuccessmessage = false; 
      this.errorMessage=false; 
      console.log("resp");
      console.log(resp);

      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage = true;
        this.loading = false; 
      }
      else{
        this.errorMessage=true;   
        this.loading = false; 
      }

      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errorMessage=false;   
        this.loading = false; 
      }, 2000);

    });



  }



}
