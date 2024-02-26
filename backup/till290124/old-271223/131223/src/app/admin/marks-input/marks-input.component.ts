import { Component, OnInit } from '@angular/core';
import { MarksInputService } from '../../services/marks-input.service';
import { PaperService } from '../../services/paper.service';
import { SemesterService } from '../../services/semester.service';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util';

@Component({
  selector: 'app-marks-input',
  templateUrl: './marks-input.component.html',
  styleUrls: ['./marks-input.component.css']
})
export class MarksInputComponent implements OnInit {

  constructor(
    private serviceData: MarksInputService,
    private serviceData2: PaperService,
    private serviceData3: SemesterService,
    ) { }

  showMarksInp:any;
  showMarksData:any;
  showPaper:any;
  showpr:any;
  showSemester:any;
  showSem:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;

  ngOnInit(): void {   
    

    this.serviceData2.showPaper().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
      console.log("this.showpr");
      console.log(this.showpr);
    })
    this.serviceData3.showSemester().subscribe((data) => {
      this.showSemester = data;
      this.showSem =  this.showSemester['Data'];
      console.log("this.showSem");
      console.log(this.showSem);
    })
  }

  // Pagination

  pageSize = 5;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


   // edit Data

   marksinputUpdate = {
    ID: "",
    STATUS: "",
    STUDENT_REGISTRATION:"",
    STUDNET_NAME:"",
    PAPER_NAME:"",
    RESULT:"",
    SCORE:""
  }

  editBtn(showMI: any, event: Event) {
    this.marksinputUpdate = JSON.parse(JSON.stringify(showMI));
    console.log(showMI.ID)
  }

  marksInputeditdata(data: any) {
    this.isSubmit = true;
    this.serviceData.editAY(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function () {
        window.location.reload();
      }, 500);
      console.log(data);
    })
  }


  selectedPaperId: number = 0; 
  selectedSem: number = 0; 

  searchMarksInput() {

    // const CURRENT_SEM = getFromLocalStorage('CURRENT_SEM');
    const userId = getFromLocalStorage('userId');

    const data = {
      "id": 0,
      "studenT_ID": 0,
      "papeR_ID": this.selectedPaperId, // Set the papeR_ID to the selectedPaperId
      "score": "string",
      "result": "string",
      "appearinG_SEM": this.selectedSem,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "V"
    };
  
    this.serviceData.showMarks(data).subscribe((response) => {
      this.showMarksData = response;
      this.showMarksInp = this.showMarksData['Data'];
      console.log("this.showMarksInp");
      console.log(this.showMarksInp);
    });
  }
  


}
