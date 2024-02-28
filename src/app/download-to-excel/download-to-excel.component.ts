import { Component, Input, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-to-excel',
  templateUrl: './download-to-excel.component.html',
  styleUrls: ['./download-to-excel.component.css']
})
export class DownloadToExcelComponent implements OnInit {

  @Input() excelName: any;

  constructor() { }

  ngOnInit(): void {
  }

  downloadExcel() {

      const content = document.getElementById('content');
  
     
      const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(content);
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      
      const wbout: ArrayBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      saveAs(blob, `${this.excelName}.xlsx`);
      
    }
}
