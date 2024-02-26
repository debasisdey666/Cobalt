import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { DoubtsService } from 'src/app/services/doubts.service';
import { TopicService } from '../../services/topic.service';
import { InstructorService } from '../../services/instructor.service';

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

  constructor(
    private serviceData:DoubtsService,
    private serviceData2:TopicService,
    private serviceData3:InstructorService,
    ) { }

  ngOnInit(): void {
    this.serviceData.showDoubts().subscribe((data)=>{
      this.showdout = data;
      this.showdbt = this.showdout['Data'];
      //console.log(this.showdbt);      
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


  // add

  getDoubtFormdata(data:any){
    this.isSubmit = true;
    this.serviceData.addDoubts(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
      }, 500);  
      console.log(data);
    });
  }

  // edit

  editDoubtFormdata(data:any){
    this.isSubmit = true;
    this.serviceData.editDoubts(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
      }, 500);  
      console.log(data);
    });
  }

}
