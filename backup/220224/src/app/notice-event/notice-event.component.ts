import { Component, OnInit } from '@angular/core';
import { NoticeEventService } from '../services/notice-event.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-notice-event',
  templateUrl: './notice-event.component.html',
  styleUrls: ['./notice-event.component.css']
})
export class NoticeEventComponent implements OnInit {

  
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef; 
  @ViewChild('getNoticEvenScholrForm') getNoticEvenScholrForm!: NgForm;
  @ViewChild('getNoticEvenScholrFormedit') getNoticEvenScholrFormedit!: NgForm;

  constructor(
    private serviceData:NoticeEventService,
    private http:HttpClient,
    ) { }

    
  linkurl: string =environment.baseUrl;
  showNoticeEvent:any;
  showNoteEvnt:any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;
  fileExists: boolean = false;
  ROLE_ID:any;

  ngOnInit(): void {

    this.serviceData.showNoticeEvent().subscribe((data) => {
      this.showNoticeEvent = data;
      this.showNoteEvnt = this.showNoticeEvent['Data'];
      console.log("this.showNoteEvnt");
      console.log(this.showNoteEvnt);
    });

     this.checkFileExistence();

     this.ROLE_ID= getFromLocalStorage('ROLE_ID');

  }

  checkFileExistence() {
    const apiUrl = '/api/file-exists';  // Replace with the actual API endpoint
    this.http.get<{ exists: boolean }>(apiUrl).subscribe(response => {
      this.fileExists = response.exists;
    });
  }

  // Pagination

  pageSize =6;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
  
  selectedType: string = '';


  url2=environment.baseUrl+"api/NoticeEvents";


   // Other properties and methods...

   @ViewChild('fileInput') fileInput: ElementRef | undefined;
   selectedFile: File | undefined;
 
   // ... Other code ...
 
   onFileSelected(event: any) {
     this.selectedFile = event.target.files[0];
   }


  // Modify the addTopic method to send the file
  addNoticeEventScholar(formData: any) {
    const userId = getFromLocalStorage('userId');
    const ROLE_ID = getFromLocalStorage('ROLE_ID');
    
    // Create a new FormData object to send form data
    const data = new FormData();

    data.append('ID', '0');
    data.append('TYPE_ID', formData.TYPE_ID);
    // data.append('ROLE', ROLE_ID);
    if (ROLE_ID !== null) {
      // data.append('ROLE', "1,2,3");
      data.append('ROLE', this.selectedOptions.join(', '));
    }
    data.append('FROMDATE', formData.FROMDATE);
    data.append('TODATE', formData.TODATE);
    data.append('TITLE', formData.TITLE);
    data.append('DETAILS', formData.DETAILS);
    if (this.selectedFile) {
      data.append('FILEPATH', this.selectedFile, this.selectedFile.name);
    }
    data.append('NEWFLAG', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'A');
    return this.http.post<any>(this.url2, data);


  }

  // ... Other code ...

  // Modify the getTopicFormdata method to call addTopic
  getNoticEvenScholrFormdata(data: any) {
    this.loading = true;
    // this.isSubmit = true;
    this.addNoticeEventScholar(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getNoticEvenScholrForm.resetForm();
      }, 1000); 
      this.ngOnInit();        
    });
  }



  options = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Faculty' },
    { id: 3, label: 'Student' }
  ];

  selectedOptions: number[] = []; // Array to store selected option IDs

  toggleOption(optionId: number) {
    if (this.selectedOptions.includes(optionId)) {
      this.selectedOptions = this.selectedOptions.filter(id => id !== optionId);
    } else {
      this.selectedOptions.push(optionId);
    }
    console.log(this.selectedOptions.join(', ')); // Display selected values with commas in the console
  }


}
