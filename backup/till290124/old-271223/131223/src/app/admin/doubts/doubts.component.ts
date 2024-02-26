import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { DoubtsService } from 'src/app/services/doubts.service';
import { TopicService } from '../../services/topic.service';
import { HttpClient } from '@angular/common/http';
import { InstructorService } from '../../services/instructor.service';
import { ViewChild, ElementRef } from '@angular/core';
import { getFromLocalStorage } from '../../../environments/local-storage-util';  
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-doubts',
  templateUrl: './doubts.component.html',
  styleUrls: ['./doubts.component.css']
})
export class DoubtsComponent implements OnInit {

  showdout:any;
  showdbt:any;
  showTopic:any;
  showTopc:any;
  showInstructor:any;
  showIns:any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  linkurl: string =environment.baseUrl;

  constructor(
    private serviceData:DoubtsService,
    private serviceData2:TopicService,
    private serviceData3:InstructorService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.serviceData.showDoubts().subscribe((data)=>{
      this.showdout = data;
      this.showdbt = this.showdout['Data'];
      console.log("this.showdbt");      
      console.log(this.showdbt);      
    })
    this.serviceData2.showTopic().subscribe((data) => {
      this.showTopic = data;
      this.showTopc =  this.showTopic['Data'];
     // console.log(this.showTopc);
    })
    this.serviceData3.showInstructor().subscribe((data) => {
      this.showInstructor = data;
      this.showIns =  this.showInstructor['Data'];
      console.log("this.showIns");
      console.log(this.showIns);
    })
  }

  
  

    // Pagination
  
    pageSize =6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }

     // edit Data

  doubtsUpdate = {
    "ID":0,
    "TOPIC_NAME":"",
    "TOPIC_ID":0,
    "INSTRUCTURE_ID":0,
    "QUESTION":"",
    "ANSWARE":"",
    "STATUS": "",
    "DOUBT_DOCUMENT_PATH": "",

  }

  editBtn(showdb:any,event:Event){
    this.doubtsUpdate= JSON.parse(JSON.stringify(showdb));
    console.log(showdb.TOPIC_NAME)
    console.log(showdb.ID)
  }


   // active / deactive Data

   actvinactv(showdb:any,event:Event){
    this.doubtsUpdate= showdb;
    console.log(showdb.ID);
  }



  // Other properties and methods...

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('fileInput') fileInput2: ElementRef | undefined;
  selectedFile: File | undefined;

  // ... Other code ...

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  url=environment.baseUrl+"api/Doubts";

  // addDoubts(formdata:any){
  //   const userId = getFromLocalStorage('userId');
  //   const studentId = getFromLocalStorage('studentId');
  //   var data=
  //   {
  //     "id": 0,
  //     "topiC_ID": parseInt(formdata.TOPIC_ID),
  //     "instructurE_ID": parseInt(formdata.INSTRUCTURE_ID),
  //     "question":  formdata.QUESTION,
  //     "answare": formdata.ANSWARE,
  //     "status": true,
  //     "quS_ADDEDBY": studentId,
  //     "anS_ADDEDBY": "2",
  //     "addedby":  userId,
  //     "updatedby": userId,
  //     "useR_ID": userId,
  //     "mode": "A"
  //   }
  //   return this.http.post(this.url,data)
  // }

  addDoubts(formdata: any) {
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studenId');
  
    // Create FormData
    const data = new FormData();
  
    // Append form fields to FormData
    data.append('id', '0');
    data.append('topiC_ID', formdata.TOPIC_ID);
    data.append('instructurE_ID', formdata.INSTRUCTURE_ID);
    data.append('question', formdata.QUESTION);
    data.append('answare', formdata.ANSWARE);
    data.append('status', 'true');
    data.append('quS_ADDEDBY', studentId !== null ? studentId.toString() : '');
    data.append('anS_ADDEDBY', '2');
    data.append('addedby', userId !== null ? userId.toString() : '');
    data.append('updatedby', userId !== null ? userId.toString() : '');
    data.append('useR_ID', userId !== null ? userId.toString() : '');
    data.append('mode', 'A');
  
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('DOUBT_DOCUMENT_PATH', this.selectedFile, this.selectedFile.name);
    }
  
    // Make the HTTP POST request
    return this.http.post(this.url, data);
  }
  

  // add

  getDoubtFormdata(data:any){
    this.isSubmit = true;
    this.addDoubts(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      // setTimeout(function() {
      //   window.location.reload();
      // }, 500);  
      console.log(data);
    });
  }

  // edit


  selectedFile2: File | undefined;

  // ... Other code ...

  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];
    console.log(this.selectedFile2);
    
  }

  editDoubtFormdata(data:any){
    this.isSubmit = true;
    this.editDoubts(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      // setTimeout(function() {
      //   window.location.reload();
      // }, 500);  
      console.log(data);
    });
  }

  editDoubts(formdata: any) {
    const userId = getFromLocalStorage('userId');
    const studentId = getFromLocalStorage('studenId');
  
    // Create FormData
    const data = new FormData();
  
    // Append form fields to FormData
    data.append('id', formdata.ID);
    data.append('topiC_ID', formdata.TOPIC_ID);
    data.append('instructurE_ID', formdata.INSTRUCTURE_ID);
    data.append('question', formdata.QUESTION);
    data.append('answare', formdata.ANSWARE);
    data.append('status', 'true');
    data.append('quS_ADDEDBY', studentId !== null ? studentId.toString() : '');
    data.append('anS_ADDEDBY', '2');
    data.append('addedby', userId !== null ? userId.toString() : '');
    data.append('updatedby', userId !== null ? userId.toString() : '');
    data.append('useR_ID', userId !== null ? userId.toString() : '');
    data.append('mode', 'U');
  
    // Check if a file is selected before adding it to FormData
    if (this.selectedFile2) {
      data.append('DOUBT_DOCUMENT_PATH', this.selectedFile2, this.selectedFile2.name);
    }
  
    // Make the HTTP POST request
    return this.http.post(this.url, data);
  }

}
