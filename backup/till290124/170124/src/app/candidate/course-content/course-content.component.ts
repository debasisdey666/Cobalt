import { Component, OnInit } from '@angular/core';
import { CourseContentService } from '../../services/course-content.service';
import { environment } from '../../../environments/environment';
import { ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var bootstrap: any; // Declare bootstrap as any


@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})


export class CourseContentComponent implements OnInit {


  constructor(
    private serviceData:CourseContentService) { }

    @ViewChild('pdfIframe') pdfIframe!: ElementRef;
    @ViewChild('htmlViewerModal') htmlViewerModal!: ElementRef;
  
    openPdfInIframe(contentPath: string): void {
      // Set the src attribute of the iframe dynamically
      this.pdfIframe.nativeElement.src = contentPath;
  
      // Trigger the Bootstrap modal to open
      const modalElement = new bootstrap.Modal(this.htmlViewerModal.nativeElement);
      modalElement.show();
    }



  showCCData:any;
  showCourseContent:any;
  linkurl: string =environment.baseUrl;

  ngOnInit(): void {
    this.serviceData.showCOurseContent().subscribe((data) => {
      this.showCCData = data;
      this.showCourseContent = this.showCCData['Data'];
      console.log(this.showCourseContent);  
      // if (this.htmlViewerModal) {
      //   console.log('htmlViewerModal initialized:', this.htmlViewerModal);
      // } else {
      //   console.error('htmlViewerModal not initialized!');
      // }
    })
  }

  expandPdf() {
    // Get the iframe element
    const iframeElement = this.pdfIframe.nativeElement;

    // Get the source URL of the iframe
    const src = iframeElement.src;

    // Open a new window or tab with the PDF
    window.open(src, '_blank');
}



}
