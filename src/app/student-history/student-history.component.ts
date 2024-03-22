import { Component, OnInit } from '@angular/core';
import { MisService } from '../services/mis.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import Options from "jspdf"
import html2canvas from 'html2canvas';
import { getFromLocalStorage } from '../../environments/local-storage-util';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css']
})
export class StudentHistoryComponent implements OnInit {

  showStudentDetails:any;
  showStudetail:any;
  linkurl: string =environment.baseUrl;
  ROLE_ID: any;
  

  constructor(
    private serviceData: MisService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {

    this.ROLE_ID = getFromLocalStorage('ROLE_ID');

    if(this.ROLE_ID == 2){
      const studntidString = getFromLocalStorage('studenId'); // Retrieve data from local storage
      if (studntidString) {
        const studntid = parseInt(studntidString, 10); // Parse the string to an integer
        console.log("studntid" + studntid);
        this.serviceData.showStudDetails(studntid).subscribe((data) => {
          this.showStudentDetails = data;
          this.showStudetail = this.showStudentDetails['Student_History'];
          console.log(this.showStudetail);
        });
      } else {
        console.log('No data found in local storage for key "stid"');
      }  
    }
    else{
      const studntidString = getFromLocalStorage('stid'); // Retrieve data from local storage
      if (studntidString) {
        const studntid = parseInt(studntidString, 10); // Parse the string to an integer
        console.log("studntid" + studntid);
        this.serviceData.showStudDetails(studntid).subscribe((data) => {
          this.showStudentDetails = data;
          this.showStudetail = this.showStudentDetails['Student_History'];
        });
      } else {
        console.log('No data found in local storage for key "stid"');
      }  
    }

        

      // const studntid = getFromLocalStorage('stid');
      //   if (studntid !== null) {
      //     console.log("studntid" + studntid);
      //     this.serviceData.showStudDetails(studntid).subscribe((data) => {
      //       this.showStudentDetails = data;
      //       this.showStudetail = this.showStudentDetails['Student_History'];
      //     });
      //   } else {
      //     console.log("studntid is null. Unable to proceed.");
      //   }
    }

  


  downloadPDF() {
    const content = document.getElementById('content');
    
    console.log("path is ,"+ this.linkurl+this.showStudetail[0].PHOTO_PATH)
  
    if (content instanceof HTMLElement) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL(this.linkurl+this.showStudetail[0].PHOTO_PATH);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        pdf.save('content.pdf');
      });
    } else {
      console.error("Element with id 'content' not found.");
    }
  }








}





  
  
  
  
  
  
  

  
  
  



function downloadPDF() {
  throw new Error('Function not implemented.');
}

