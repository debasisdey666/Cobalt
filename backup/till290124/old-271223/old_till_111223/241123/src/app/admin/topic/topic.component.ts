import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TopicService } from '../../services/topic.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { PaperService } from 'src/app/services/paper.service';
import { BranchService } from 'src/app/services/branch.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { SemesterService } from 'src/app/services/semester.service';
import { getFromLocalStorage } from '../../../environments/local-storage-util';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  linkurl: string =environment.baseUrl;

  // userId = environment.userId;

  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  showTopc:any;
  showTopic:any;
  showChapter:any;
  showCptr:any;
  showACData:any;
  showBranchData:any;
  showBranch:any;
  showAcademicYearTrue:any;
  showSemesterTrue:any;
  showSem:any;  
  showPaper: { PAPER: any[] } = { PAPER: [] };  
  showpr: any[] = [];
  selectedPaper: any;
  selectedChapter: any;

  constructor(
    private http:HttpClient,
    private serviceData:TopicService,
    private serviceData2:ChapterService,
    private serviceData3:AcademicYearService,
    private serviceData4:BranchService,
    private serviceData5:SemesterService,
    private serviceData6:PaperService
    
    ) { } 


 

  ngOnInit(): void {
    this.serviceData.showTopic().subscribe((data) => {
      this.showTopic = data;
      this.showTopc =  this.showTopic['Data'];
      console.log(this.showTopc);
    })
    this.serviceData2.showChapter().subscribe((data) => {
      this.showChapter = data;
      this.showCptr =  this.showChapter['Data'];
      console.log("this.showCptr");
      console.log(this.showCptr);
    })
    this.serviceData3.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })
    this.serviceData4.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })
    this.serviceData5.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem =  this.showSemesterTrue['Data'];
      console.log(this.showSem);
    })
  }

 
  url=environment.baseUrl+"api/Topic";

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  selectedACId:any;
  selectedBranchId:any;
  selectedSemester:any;

  onAChange(event: any): void {
    this.selectedACId = event.target.value;
    console.log('Selected AC ID:', this.selectedACId);
  }
  onBranchChange(event: any): void {
    this.selectedBranchId = event.target.value;
    console.log('Selected Branch ID:', this.selectedBranchId);
  }
  onSemesterChange(event: any): void {
    const selectedSemesterId = event.target.value;
  console.log('Selected Semester ID:', selectedSemesterId);
  console.log('Selected Branch ID:', this.selectedBranchId);
  console.log('Selected AC ID:', this.selectedACId);
    
  this.serviceData6.showPaperDropdownBindChapter(selectedSemesterId,this.selectedBranchId,this.selectedACId).subscribe((data) => {
    console.log('Server Response:', data);
     if (data && data.PAPER && data.PAPER.length > 0) {
      this.showPaper.PAPER = data.PAPER;
      this.showpr = this.showPaper.PAPER;
      console.log('showpr:', this.showpr);
      console.log('showpr:', this.showpr[0].CHAPTER[0].CHAPTER_NAME);
      // console.log('data:', this.showPaper.PAPER.CHAPTER);
    } else {
      this.showPaper.PAPER = [];
      this.showpr = [];
      console.log('No paper information available.');
    }
  });

  }

  chapters:any;
  selectedPapermn:any;

  onSelectPaper(): void {
    const selectedPaper = this.showpr.find(paper => paper.ID === this.selectedPaper);
    
    console.log('Selected Paper:', selectedPaper);

    this.chapters = selectedPaper ? selectedPaper.CHAPTER : [];
}

   // Pagination
  
   pageSize =5;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }

  // Other properties and methods...

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | undefined;

  // ... Other code ...

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Modify the addTopic method to send the file
  addTopic(formData: any) {
    const userId = getFromLocalStorage('userId');
    const data = new FormData();
    data.append('ID', '0');
    data.append('TOPIC_NAME', formData.TOPIC_NAME);
    data.append('CHAPTER_ID', formData.CHAPTER_ID);
    if (this.selectedFile) {
      data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
    }
    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'A');

    return this.http.post(this.url, data);
  }

  // ... Other code ...

  // Modify the getTopicFormdata method to call addTopic
  getTopicFormdata(data: any) {
    this.isSubmit = true;
    this.addTopic(data).subscribe((result) => {
      this.addSuccessmessage = true;
      setTimeout(function () {
        window.location.reload();
      }, 500);
      // Do any necessary actions after the form data is submitted
      // For example, you can reset the form or navigate to another page.
      this.resetFormValue(data); // Reset the form
    });
  }


// edit Data

topicUpdate = {
  ID:"",
  TOPIC_NAME:"",
  STATUS:"",
  CHAPTER_NAME:"",
  CHAPTER_ID:"",
  CONTENT_PATH: ""
}


editBtn(showTc: any, event: Event) {
  this.topicUpdate = JSON.parse(JSON.stringify(showTc));
  console.log(showTc.CONTENT_PATH)
  this.topicUpdate.CONTENT_PATH = showTc.this.selectedFile.name;
}



editTopic(formData:any) {
  const userId = getFromLocalStorage('userId');
  const data = new FormData();
  data.append('ID', formData.ID);
  data.append('TOPIC_NAME', formData.TOPIC_NAME);
  data.append('CHAPTER_ID', formData.CHAPTER_ID);
  if (this.selectedFile) {
    data.append('CONTENT_PATH', this.selectedFile, this.selectedFile.name);
  }
  data.append('STATUS', 'true');
  if (userId !== null) {
    data.append('ADDEDBY', userId);
  }
  if (userId !== null) {
    data.append('UPDATEDBY', userId);
  }
  data.append('MODE', 'U');

  return this.http.post(this.url, data);
}


topicFormeditdata(data: any) {
  this.isSubmit = true;
  this.editTopic(data).subscribe((result) => {
    this.addSuccessmessage = true;
    this.ngOnInit();
    setTimeout(function () {
      window.location.reload();
    }, 500);
    console.log(data);
  })
}


// active / deactive Data

actvinactv(showTc:any,event:Event){
  this.topicUpdate= showTc;
}


topicStstusFormData() {

  this.serviceData.statusTopic(this.topicUpdate).subscribe(
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
