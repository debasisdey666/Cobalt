import { Component, OnInit } from '@angular/core';
import { MarksInputService } from '../../services/marks-input.service';

@Component({
  selector: 'app-marks-input',
  templateUrl: './marks-input.component.html',
  styleUrls: ['./marks-input.component.css']
})
export class MarksInputComponent implements OnInit {

  constructor(private serviceData: MarksInputService) { }

  showMarksInp:any;
  showMarksData:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;

  ngOnInit(): void {
    this.serviceData.showMarks().subscribe((data) => {
      this.showMarksData = data;
      this.showMarksInp = this.showMarksData['Data'];
      console.log("this.showMarksInp");
      console.log(this.showMarksInp);
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


}
