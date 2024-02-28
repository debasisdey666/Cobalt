import { Component, OnInit } from '@angular/core';
import { MisService } from '../services/mis.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import Options from "jspdf"
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css']
})
export class StudentHistoryComponent implements OnInit {

  showStudentDetails:any;
  showStudetail:any;
  linkurl: string =environment.baseUrl;

  constructor(
    private serviceData: MisService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    const studentID = +this.route.snapshot.params['ID'];
    
    this.serviceData.showStudDetails(studentID).subscribe((data) => {
      this.showStudentDetails = data;
      this.showStudetail = this.showStudentDetails['Student_History'];
      console.log("this.showStudetail");
      console.log(studentID);
      console.log("this.showStudetail");
      console.log(this.showStudetail);
    })
    
  }


  // downloadExcel() {

    
  //   const content = document.getElementById('content');

   
  //   const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(content);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

    
  //   const wbout: ArrayBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const blob = new Blob([wbout], { type: 'application/octet-stream' });
  //   saveAs(blob, 'content.xlsx');
    
  // }

  downloadExcel() {
    // Fetch HTML content
    const content = document.getElementById('content');
  
    // Check if the element with id 'content' exists
    if (content) {
      // Convert content to Excel format
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
  
      // Iterate over each table
      const tables = content.getElementsByTagName('table');
      for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(table);
  
        // Add a blank row after each table (except the last one)
        if (i < tables.length - 1) {
          xlsx.utils.sheet_add_aoa(ws, [[]], { origin: -1 }); // Add blank row at the end
        }
  
        // Define a class name for each table (optional)
        const className = `table-${i + 1}`;
  
        // Add the class name as a property to the sheet object
        Object.defineProperty(ws, 'className', { value: className, writable: true });
  
        xlsx.utils.book_append_sheet(wb, ws, `Table ${i + 1}`);
      }
  
      // Trigger download
      const wbout: ArrayBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      saveAs(blob, 'content.xlsx');
    } else {
      console.error("Element with id 'content' not found.");
    }
  }


  downloadPDF() {
    // Fetch HTML content
    const content = document.getElementById('content');
  
    // Check if the element with id 'content' exists
    if (content instanceof HTMLElement) {
      // Convert HTML to canvas
      html2canvas(content).then(canvas => {
        // Convert canvas to PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Download PDF
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

