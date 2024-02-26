import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaperService } from 'src/app/services/paper.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { BranchService } from 'src/app/services/branch.service';
import { PaperTypeService } from 'src/app/services/paper-type.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(
    private serviceData:PaperService,
    private serviceData2:AcademicYearService,
    private serviceData3:SemesterService,
    private serviceData4:BranchService,
    private serviceData5:PaperTypeService,
    ) { }

    showPaper:any;
    showpr:any;
    showAcademicYearTrue:any;
    showSem:any;
    showACData:any;
    showBranchData:any;
    showPapertype:any;
    showPTData:any;
    showBranch:any;
    showSemesterTrue:any;
    isSubmit=false;  
    addSuccessmessage:boolean=false;
    updateSuccessmessage:boolean=false;

  ngOnInit(): void {
    this.serviceData.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
    })

    this.serviceData2.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })

    this.serviceData3.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem =  this.showSemesterTrue['Data'];
      console.log(this.showSem);
    })

    this.serviceData4.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })

    this.serviceData5.showPapertypeTrue().subscribe((data) => {
      this.showPTData = data;
      this.showPapertype =  this.showPTData['Data'];
      console.log(this.showPapertype);
    })

  }

   // Pagination
  
   pageSize =5;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }


   // Add Data
   getPaperFormdata(data:any){
    this.isSubmit=true;
    this.serviceData.addPaper(data).subscribe((result)=>{
      this.addSuccessmessage=true;
    //   this.ngOnInit();
    //   setTimeout(function() {
    //     window.location.reload();
    // }, 500);

      console.log(data);
    })  
  }



   // edit Data

  paperUpdate = {
    "ID":0,
    "PAPER_CODE": "string",
    "PAPER_NAME": "string",
    "BRANCH_ID": 0,
    "SEM_ID": 0,
    "SEM": "",
    "AY":"",
    "AY_ID": 0,
    "PAPER_TYPE_ID": 0,
    "CREDIT_SCORE": 0,
    "PAPER_TYPE":"",
    "STATUS": "",

  }

  editBtn(showprdata:any,event:Event){
    this.paperUpdate= JSON.parse(JSON.stringify(showprdata));
    console.log(showprdata.CREDIT_SCORE)
  }


  paperFormeditdata(data: any) {
    this.isSubmit = true;
    this.serviceData.editPaper(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function () {
        window.location.reload();
      }, 500);
      console.log(data);
    })
  }



    // active / deactive Data

    actvinactv(showprdata:any,event:Event){
      this.paperUpdate= showprdata;
      console.log(showprdata.ID);
    }


    paperStstusFormData() {
  
      this.serviceData.statusPaper(this.paperUpdate).subscribe(
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
