import { Component, OnInit } from '@angular/core';
import { SemesterService } from '../services/semester.service';
import { ResultService } from '../services/result.service';
import { getFromLocalStorage } from '../../environments/local-storage-util';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  showSemester:any;
  showSem:any; 
  showMarks:any; 
  showMarksData:any; 
  showMarksInp:any; 
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  addErrormessage: boolean = false;
  loading: boolean = false;

  constructor(
    private serviceData: SemesterService,
    private serviceData2: ResultService,
  ) {}

  ngOnInit(): void {
    this.serviceData.showSemester().subscribe((data) => {
      this.showSemester = data;
      this.showSem =  this.showSemester['Data'];
      console.log("this.showSem");
      console.log(this.showSem);  
    })   
  }

    // Pagination

    pageSize = 6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
    }


  selectedSem: number = 0; 

  

  searchResultInput() {
    
    // const CURRENT_SEM = getFromLocalStorage('CURRENT_SEM');
    const userId = getFromLocalStorage('userId');
    const studenId = getFromLocalStorage('studenId');

    const data = {
      "id": 0,
      "studenT_ID": studenId,
      "papeR_ID": 0,
      "score": "string",
      "result": "string",
      "appearinG_SEM": this.selectedSem,
      "status": true,
      "addedby": userId,
      "updatedby": userId,
      "mode": "S"
    };

    this.serviceData2.showMarks(data).subscribe((response) => {
      this.isSubmit = false;
      this.showMarksData = response;
      this.showMarksInp = this.showMarksData['Data'];
      console.log("this.showMarksInp");
      console.log(this.showMarksInp);
    
      if (!this.showMarksInp || this.showMarksInp.length === 0) {
        // Data not found
        console.log("Data not found");
        this.addErrormessage = true;
      } else {
        // Data found
        console.log("Data found");
        this.addErrormessage = false;
      }
    }); 
   

  }


}

