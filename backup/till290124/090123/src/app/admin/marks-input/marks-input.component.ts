import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { MarksInputService } from '../../services/marks-input.service';
import { PaperService } from '../../services/paper.service';
import { SemesterService } from '../../services/semester.service';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-marks-input',
  templateUrl: './marks-input.component.html',
  styleUrls: ['./marks-input.component.css']
})
export class MarksInputComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('marksInputedit') marksInputedit!: NgForm;
  @ViewChild('progrmFormedit') progrmFormedit!: NgForm;

  constructor(
    private serviceData: MarksInputService,
    private serviceData2: PaperService,
    private serviceData3: SemesterService,
    private zone: NgZone
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
  addErrormessage: boolean = false;
  loading: boolean = false;

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

  // marksInputeditdata(data: any) {
  //   this.loading = true;
  //   // this.isSubmit = true;
  //   this.serviceData.editAY(data).subscribe((result) => {
  //     this.addSuccessmessage = true;
  //     this.loading = false;
  //     setTimeout(() => {
  //       this.addSuccessmessage = false;
  //       this.closeButton.nativeElement.click();
  //       this.marksInputedit.resetForm();
  //     }, 1000); 
      
  //     this.ngOnInit(); 
  //   })
  // }

  marksInputeditdata(data: any) {
    this.loading = true;
  
    this.serviceData.editAY(data).subscribe((result) => {
      this.zone.run(() => {
        this.addSuccessmessage = true;
        this.loading = false;
      
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton.nativeElement.click();
          this.marksInputedit.resetForm();
          this.searchMarksInput()
        }, 1000);
  
        this.ngOnInit(); 
      });
    });
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
  
    // this.serviceData.showMarks(data).subscribe((response) => {
    //   this.showMarksData = response;
    //   this.showMarksInp = this.showMarksData['Data'];
    //   console.log("this.showMarksInp");
    //   console.log(this.showMarksInp);
    // });

    
      this.serviceData.showMarks(data).subscribe((response) => {
        this.showMarksData = response;
        this.showMarksInp = this.showMarksData['Data'];
        console.log("this.showMarksInp");
        console.log(this.showMarksInp);

        if(this.showMarksInp.length > 1){
          console.log("data");
          this.addErrormessage = false;  
        }
        else{
          console.log("nil"); 
          this.addErrormessage = true;         
        }
        
      });
   

  }
  


}
