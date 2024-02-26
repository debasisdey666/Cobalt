import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { BranchService } from '../services/branch.service';
import { CollegeService } from '../services/college.service';
import { PaperService } from 'src/app/services/paper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  url=environment.baseUrl+"api/Instructor";

  constructor(
    private serviceData:InstructorService,
    private serviceData2:BranchService,
    private serviceData3:CollegeService,
    private serviceData4:PaperService,
    private http:HttpClient
  ) {
    this.getInstructorForm = {
      NAME: '',
      BRANCH_ID: '',
      COLLEGE_ID: '',
      // Other form fields...
      showpr: [] // Initialize an array for checkbox data
    };
   }

  showIns:any;
  showInstructor:any;
  showBranch:any;
  showBranchData:any;
  showCTData:any;
  showCollegeType:any;
  getInstructorForm:any;
  showPaper:any;
  showpr:any[] = [];
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;


  ngOnInit(): void {
    this.serviceData.showInstructor().subscribe((data) => {
      this.showInstructor = data;
      this.showIns =  this.showInstructor['Data'];
      console.log("this.showIns");
      console.log(this.showIns);
    })
    this.serviceData2.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })
    this.serviceData3.showCollegeTypeTrue().subscribe((data) => {
      this.showCTData = data;
      this.showCollegeType =  this.showCTData['Data'];
    })
    
    this.serviceData4.showPaperTrue().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
      console.log(this.showpr);
    })
    
  }

     // Pagination
  
     pageSize =5;
     items = [];
     pageOfItems: Array<any> | undefined;
   
     onChangePage(pageOfItems: Array<any>) {
       this.pageOfItems = pageOfItems;
     }

     logCheckboxState(papDropdwn: any) {
      papDropdwn.isChecked = !papDropdwn.isChecked;
      console.log('Checkbox ID:', papDropdwn.ID);
      console.log('Is Checked:', papDropdwn.isChecked);
    }

    logSelectedPapersAndFormattedPapers() {
      const selectedPapers = this.showpr.filter((papDropdwn) => papDropdwn.isChecked);
      console.log('Selected Papers:', selectedPapers);
  
      const formattedPapers = selectedPapers.map((papDropdwn) => ({
        papeR_ID: papDropdwn.ID,
      }));
      console.log('Formatted Papers:', formattedPapers);
    }

  getInstructorFormdata(data: any) {
    this.isSubmit = true;
    this.addinstructor(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
      }, 500);
  
      console.log(data);
    });
  }

  
  addinstructor(formData: any) {
    const collegeIdAsNumber: number = Number(formData.COLLEGE_ID);
    const branchIdAsNumber: number = Number(formData.BRANCH_ID);


    const selectedPapers = this.showpr.filter((papDropdwn) => papDropdwn.isChecked);
    console.log('Selected Papers:', selectedPapers);

    const formattedPapers = selectedPapers.map((papDropdwn) => ({
      papeR_ID: papDropdwn.ID.toString(),
    }));
    console.log('Formatted Papers:', formattedPapers);
  
    const formattedPapersString = JSON.stringify(formattedPapers);
    const parsedFormattedPapers = JSON.parse(formattedPapersString);
  
    var data = {
      "id": 0,
      "NAME": formData.NAME,
      "BRANCH_ID": branchIdAsNumber,
      "COLLEGE_ID": collegeIdAsNumber,
      "PH_NUMBER": formData.PH_NUMBER,
      "EMAIL": formData.EMAIL,
      "DOB": formData.DOB,
      "GENDER": formData.GENDER,
      "status": true,
      "paperDetails": parsedFormattedPapers,
      "addedby": "1",
      "updatedby": "string",
      "mode": "A"
    };
  
    return this.http.post(this.url, data);
  }


     instructrUpdate = {
      ID: "",
      NAME: "",
      BRANCH_ID: "",
      COLLEGE_ID: "",
      GENDER: "",
      STATUS: "",
      EMAIL: "",
      PH_NUMBER: "",
      DOB: ""
    }
  
    editBtn(showInstructr:any,event:Event){
      this.instructrUpdate= JSON.parse(JSON.stringify(showInstructr));
      this.instructrUpdate.DOB = this.DateString(showInstructr.DOB) ?? "";
      console.log(showInstructr.ID)
      
    }

    //Convert Date

  DateString(inputdate: Date | undefined): string | undefined {
    if (inputdate) {
      inputdate = new Date(inputdate);
      const _inputdate =
        inputdate.getFullYear().toString() +
        '-' +
        ('0' + (inputdate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + inputdate.getDate().toString()).slice(-2);
      return _inputdate;
    }
    return;
  }


    
    editInstructorFormdata(data:any){
      this.isSubmit=true;
      this.editinstructor(data).subscribe(()=>{
        this.addSuccessmessage=true;
        this.ngOnInit();
        setTimeout(function() {
          window.location.reload();
      }, 500);
        console.log(data);
      })  
    }

    editinstructor(formData: any) {
      const collegeIdAsNumber: number = Number(formData.COLLEGE_ID);
      const branchIdAsNumber: number = Number(formData.BRANCH_ID);
  
  
      const selectedPapers = this.showpr.filter((papDropdwn) => papDropdwn.isChecked);
      console.log('Selected Papers:', selectedPapers);
  
      const formattedPapers = selectedPapers.map((papDropdwn) => ({
        papeR_ID: papDropdwn.ID.toString(),
      }));
      console.log('Formatted Papers:', formattedPapers);
    
      const formattedPapersString = JSON.stringify(formattedPapers);
      const parsedFormattedPapers = JSON.parse(formattedPapersString);
    
      var data = {
        "id":formData.ID,
        "NAME": formData.NAME,
        "BRANCH_ID": branchIdAsNumber,
        "COLLEGE_ID": collegeIdAsNumber,
        "PH_NUMBER": formData.PH_NUMBER,
        "EMAIL": formData.EMAIL,
        "DOB": formData.DOB,
        "GENDER": formData.GENDER,
        "status": true,
        "paperDetails": parsedFormattedPapers,
        "addedby": "1",
        "updatedby": "string",
        "mode": "U"
      };
    
      return this.http.post(this.url, data);
    }


      // active / deactive Data

  actvinactv(showInstructr:any,event:Event){
    this.instructrUpdate= showInstructr;
    console.log(showInstructr.ID);
  }


  InstructorFormData() {

    this.serviceData.statusInst(this.instructrUpdate).subscribe(
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
