import { Component, OnInit } from '@angular/core';
import { NoticeEventService } from '../services/notice-event.service';

@Component({
  selector: 'app-notice-event',
  templateUrl: './notice-event.component.html',
  styleUrls: ['./notice-event.component.css']
})
export class NoticeEventComponent implements OnInit {

  constructor(private serviceData:NoticeEventService) { }

  showNoticeEvent:any;
  showNoteEvnt:any;

  ngOnInit(): void {

    this.serviceData.showNoticeEvent().subscribe((data) => {
      this.showNoticeEvent = data;
      this.showNoteEvnt = this.showNoticeEvent['Data'];
      console.log("this.showNoteEvnt");
      console.log(this.showNoteEvnt);
    });

  }

     // Pagination
  
     pageSize =5;
     items = [];
     pageOfItems: Array<any> | undefined;
   
     onChangePage(pageOfItems: Array<any>) {
       this.pageOfItems = pageOfItems;
     }

}
