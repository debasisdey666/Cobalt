import { Component, OnInit } from '@angular/core';
import { CourseContentService } from '../../services/course-content.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  htmlContent: string = ''; // This property will hold the HTML content

  // Function to set the HTML content
  setHtmlContent(content: string): void {
    this.htmlContent = content;
  }
  
  constructor(private serviceData:CourseContentService) { }

  showCCData:any;
  showCourseContent:any;
  linkurl: string =environment.baseUrl;


  ngOnInit(): void {
    this.serviceData.showCOurseContent().subscribe((data) => {
      this.showCCData = data;
      this.showCourseContent = this.showCCData['Data'];
      console.log(this.showCourseContent);       
      // for (let i = 0; i < this.showCourseContent[0].ViewPaperDetail.length; i++){
      //   var showCourseContentAll = this.showCourseContent[0].ViewPaperDetail[i];
      //   console.log(showCourseContentAll.PAPER_NAME); 
      // }

      // console.log(this.showCourseContent[0].ViewPaperDetail[0].PAPER_NAME);  
      // console.log(this.showCourseContent[0].ViewPaperDetail[1].PAPER_NAME);  
      // console.log(this.showCourseContent[0].ViewPaperDetail[2].PAPER_NAME);  
      // console.log(this.showCourshowCourseContentseContent[0].ViewPaperDetail[3].PAPER_NAME);  
    })
  }



}
