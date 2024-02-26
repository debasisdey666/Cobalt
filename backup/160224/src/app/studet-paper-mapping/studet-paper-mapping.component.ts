import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentPaperMappingService } from '../services/student-paper-mapping.service';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-studet-paper-mapping',
  templateUrl: './studet-paper-mapping.component.html',
  styleUrls: ['./studet-paper-mapping.component.css']
})
export class StudetPaperMappingComponent implements OnInit {  


  showStudentPapMapp: any;
  showStuPapMap: any;
  showStudentData: any;
  showStudent: any;
  myForm: any;
  showstupap: any;
  addSuccessmessage:boolean=false;
  loading:boolean=false;
  constructor(
    private serviceData: StudentPaperMappingService,
    ) { }

  // ngOnInit(): void {

  //   this.serviceData.showStudentlist().subscribe((data) => {
  //     this.showStudentData = data;
  //     this.showStudent = this.showStudentData['Data'];
  //     console.log("this.showStudent");
  //     console.log("this.showStudent.CURRENT_SEM");
  //     console.log(this.showStudent);
  //     console.log(this.showStudent[0].CURRENT_SEM);
  //     localStorage.setItem('CURRENT_SEM', this.showStudent[0].CURRENT_SEM);
  //   })

  //   this.serviceData.showStudentPaperMapping().subscribe((data) => {
  //     this.showStudentPapMapp = data;
  //     this.showStuPapMap = this.showStudentPapMapp['Data'];
  //     console.log(this.showStuPapMap);
      
  //   })  

   
  // }


  ngOnInit(): void {
    this.serviceData
      .showStudentlist()
      .pipe(
        concatMap((studentListData) => {
          // Handle student list data and set CURRENT_SEM in localStorage
          this.showStudentData = studentListData;
          this.showStudent = this.showStudentData['Data'];
          localStorage.setItem('CURRENT_SEM', this.showStudent[0].CURRENT_SEM);
          console.log(this.showStudent);
  
          // Now, return the observable for showStudentPaperMapping
          return this.serviceData.showStudentPaperMapping();
        })
      )
      .subscribe((paperMappingData) => {
        // Handle paper mapping data
        this.showStudentPapMapp = paperMappingData;
        this.showStuPapMap = this.showStudentPapMapp['Data'];
        console.log("this.showStuPapMap");
        console.log(this.showStuPapMap);
      });
  }

  

  selectedPaperIds: string[] = [];

  isCheckboxChecked(showstupap: any): boolean {
    return showstupap.PAPER_TYPE === 'E' && showstupap.RECORDSAVED === 'True' || showstupap.PAPER_TYPE !== 'E' ;
  }
  toggleCheckbox(showstupap: any) {
    showstupap.selected = !showstupap.selected;
  }
  

  hideSubmitButton: boolean = false;
  studenPaperMapFormdata() {
    this.loading = true;
  var x = $("#studenpaper li").length;
  var papeR_ID = [];
    for(let i=1; i<x; i++){
      let input = $('#PAPER_ID_'+i);
      if(input.is(':checked')) papeR_ID.push(input.val());
    }
    
  const data = this.createFormData([papeR_ID.toString()]);
    this.serviceData.addStudentPaperMapping(data).subscribe((result) => {
      this.updateSelectedPapers(data.paperdetails);
      this.addSuccessmessage = true;
      
      this.loading = false;
      
      setTimeout(() => {        
        // Other logic or actions you want to perform
        this.addSuccessmessage = false;
        
        window.location.reload();        
      }, 1000);
      this.hideSubmitButton = true; // Use an arrow function to preserve 'this'
    });
  }

  // Helper function to get selected paper IDs
  getSelectedPaperIds() {
    return this.showStuPapMap
      .filter((showstupap: { selected: any; }) => showstupap.selected)
      .map((showstupap: { PAPER_ID: any; }) => showstupap.PAPER_ID);
  }
  
  // Helper function to create the payload with selected paper IDs
  createFormData(selectedPaperIds: string[]) {
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studenId');
    const CURRENT_SEM = getFromLocalStorage('CURRENT_SEM');
    
    var stringArray = selectedPaperIds[0].split(",");
    var obj = {
      id: 0,
      studenT_ID: studentId,
      paperdetails: stringArray.map((PAPER_ID: any) => ({
        papeR_ID: PAPER_ID,
        score: "",
        result: ""
      })),
      appearinG_SEM: CURRENT_SEM,
      status: true,
      "addedby": userId,
      "updatedby":userId,
      mode: "A"
    };
    return obj;
  }
  
  // Helper function to update selected papers after submission
  updateSelectedPapers(selectedPaperDetails: any[]) {
    this.showStuPapMap.forEach((paper: any) => {
      if (selectedPaperDetails.some((detail) => detail.papeR_ID === paper.PAPER_ID)) {
        paper.RECORDSAVED = true;
        paper.selected = false;
      }
    });
  }
  

}
