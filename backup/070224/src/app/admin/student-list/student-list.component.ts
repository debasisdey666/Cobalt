import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { getFromLocalStorage } from '../../../environments/local-storage-util';
import { StudentlistService } from '../../services/studentlist.service';
import { HttpClient } from '@angular/common/http';
import { BranchService } from 'src/app/services/branch.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { SemesterService } from 'src/app/services/semester.service';
import { CollegeService } from '../../services/college.service';
import * as XLSX from 'xlsx';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('closeButton4') closeButton4!: ElementRef;
  @ViewChild('getStudentForm') getStudentForm!: NgForm;
  @ViewChild('studentFormedit') studentFormedit!: NgForm;
  @ViewChild('userbulklistForm') userbulklistForm!: NgForm;

  availableYears: number[] = [];

  maxDate: string = '';

  constructor(
    private serviceData: StudentlistService,
    private serviceData2: BranchService,
    private serviceData3: AcademicYearService,
    private serviceData4: SemesterService,
    private serviceData5: CollegeService,
    private http: HttpClient,
    private el: ElementRef
    
  ) {
    this.setMaxDate();

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 4;
    
    for (let year = startYear; year <= currentYear; year++) {
      this.availableYears.push(year);
    }
   }


   states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
    'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];

  selectedState: string = '';

   

  linkurl: string = environment.baseUrl;


  showStudent: any;
  showBranchData: any;
  showACData: any;
  showAcademicYearTrue: any;
  showSemesterTrue: any;
  showSem: any;
  showBranch: any;
  showCTData: any;
  showCollegeType: any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  errorMessage: boolean = false;
  loading: boolean = false;

  showStudentData: any[] = [];
  pageOfItems: any[] = [];
  searchText: string = '';
  filteredItems: any[] = [];
  searchFilters: { [key: string]: string } = {};

  totalPages: any;
  // pageSize: number = 4;
  currentPage: number = 3;
  // pageRange: number = 4;

  currentIndex: number = 0;




  resetFormValue(myForm: NgForm) {
    myForm.resetForm()
  }


  // pageOfItems!: any[];
  studentCount: number = 0; // Initialize the property

  ngOnInit(): void {
    this.currentPage = 1;
    console.log('Current Page:', this.currentPage);

    this.serviceData2.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch = this.showBranchData['Data'];
    })

    this.serviceData3.showAcademicYearTrue().subscribe((data) => {
      this.showACData = data;
      this.showAcademicYearTrue = this.showACData['Data'];
    })

    this.serviceData4.showSemesterTrue().subscribe((data) => {
      this.showSemesterTrue = data;
      this.showSem = this.showSemesterTrue['Data'];
      //console.log(this.showSem);
    })

    this.serviceData5.showCollegeTypeTrue().subscribe((data) => {
      this.showCTData = data;
      this.showCollegeType = this.showCTData['Data'];
    })

    this.serviceData.showStudentlist().subscribe((data) => {
      this.showStudentData = data['Data'];
      this.updateFilteredItems();
      this.studentCount = this.showStudentData.length;
      console.log("studentCount" + this.studentCount)
      console.log("totalPages" + this.studentCount);
      this.totalPages = Math.ceil(this.studentCount / 4);
    });

  }


 

  itemsPerPage: number = 4;
  // Date Of Birth Validation should not enter future date

  setMaxDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    let month: number | string = today.getMonth() + 1;
    let day: number | string = today.getDate();

    // Ensure month and day have two digits
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    this.maxDate = `${year}-${month}-${day}`;
  }

  
 
  // updateFilteredItems() {
  //   this.filteredItems = this.showStudentData.filter((item) =>
  //     Object.keys(this.searchFilters).every(
  //       (key) =>
  //         !this.searchFilters[key] ||
  //         (item[key] &&
  //           typeof item[key] === 'string' &&
  //           item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
  //     )
  //   );
  
  //   this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  
  //   // Adjust the current page if it exceeds the total number of pages
  //   if (this.currentPage > this.totalPages) {
  //     this.currentPage = this.totalPages;
  //   }
  
  //   this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);

  //   this.studentCount = this.filteredItems.length;
  // }

  updateFilteredItems() {
    // If search filters are present, filter the data
    if (Object.values(this.searchFilters).some(filter => !!filter)) {
      this.filteredItems = this.showStudentData.filter((item) =>
        Object.keys(this.searchFilters).every(
          (key) =>
            !this.searchFilters[key] ||
            (item[key] &&
              typeof item[key] === 'string' &&
              item[key].toLowerCase().includes(this.searchFilters[key].toLowerCase()))
        )
      );
    } else {
      // If no search filters, show all data
      this.filteredItems = this.showStudentData.slice();
    }
  
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
  
    // Update studentCount after filtering
    this.studentCount = this.filteredItems.length;
  }
  
  
  
  paginate(array: any[], pageNumber: number, pageSize: number): any[] {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  }
  
  onChangePage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updateFilteredItems();
    }
  }
  
  onPreviousButtonClick(): void {
    if (this.currentPage > 1) {
      this.onChangePage(this.currentPage - 1);
    }
  }
  
  onNextButtonClick(): void {
    if (this.currentPage < this.totalPages) {
      this.onChangePage(this.currentPage + 1);
    }
  }
  
  resetPagination(): void {
    this.currentPage = 1;
    this.updateFilteredItems();
  }
  
  pagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }
  

  // exportToExcel(): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredItems);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   // Save the Excel file
  //   XLSX.writeFile(wb, 'student-data.xlsx');
  // }

  exportToExcel(): void {
    console.log('Exporting to Excel...');
    console.log('Filtered Items:', this.filteredItems);
  
    if (this.filteredItems.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredItems);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      try {
        // Save the Excel file
        XLSX.writeFile(wb, 'student-data.xlsx');
        console.log('Excel file saved successfully.');
      } catch (error) {
        console.error('Error saving Excel file:', error);
      }
    } else {
      console.warn('Filtered Items array is empty. No data to export.');
    }
  }
  
  selectedCollege: number = 0;
  selectedBranch: number = 0;

  // Other properties and methods...

  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @ViewChild('fileInput2') fileInput2: ElementRef | undefined;
  selectedFile: File | undefined;
  selectedFile2: File | undefined;

  // ... Other code ...

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];
  }

  url = environment.baseUrl + "api/StudentDetails";


  // Modify the addTopic method to send the file
  addStudent(formData: any) {

    const userId = getFromLocalStorage('userId');
    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', '0');
    data.append('STUDENT_REGISTRATION', formData.STUDENT_REGISTRATION);
    data.append('STUDENT_NAME', formData.STUDENT_NAME);
    data.append('REGISTRATION_YEAR', formData.REGISTRATION_YEAR);
    data.append('BRANCH_ID', formData.BRANCH_ID);
    data.append('CURRENT_AY', formData.CURRENT_AY);
    data.append('CURRENT_SEM', formData.CURRENT_SEM);
    data.append('COLLEGE_ID', formData.COLLEGE_ID);
    data.append('FATHER_NAME', formData.FATHER_NAME);
    data.append('MOTHER_NAME', formData.MOTHER_NAME);
    data.append('PH_NUMBER', formData.PH_NUMBER);
    data.append('EMAIL', formData.EMAIL);
    data.append('ADHAAR_NO', formData.ADHAAR_NO);
    data.append('DOB', formData.DOB);
    data.append('ADDRESS', formData.ADDRESS);
    data.append('STATE', formData.STATE);
    data.append('DISTRICT', formData.DISTRICT);
    data.append('PINCODE', formData.PINCODE);
    data.append('GENDER', formData.GENDER);
    data.append('CATEGORY', formData.CATEGORY);
    data.append('IS_PWD', formData.IS_PWD,);
    data.append('MARITAL_STATUS', formData.MARITAL_STATUS);

    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('PHOTO_PATH', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile2) {
      data.append('SIGNATURE_PATH', this.selectedFile2, this.selectedFile2.name);
    }
    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'A');
    // Send a POST request with the FormData
    return this.http.post<any>(this.url, data);
  }

  // fileInput:any

  // Add Data
  getStudentFormdata(data: any) {
    
    this.loading = true;
    // this.isSubmit = true;
    this.addStudent(data).subscribe((resp: any)=>{
      
      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage=true;  
        this.loading = false; 
      }
      else{
        this.errorMessage=true;   
        this.loading = false; 
      }
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errorMessage = false;
        this.closeButton.nativeElement.click();
        this.getStudentForm.resetForm();

          if (this.fileInput && this.fileInput.nativeElement) {
            this.fileInput.nativeElement.value = ''; // Clear file input value
          }    
          if (this.fileInput2 && this.fileInput2.nativeElement) {
            this.fileInput2.nativeElement.value = ''; // Clear file input value
          }   
      }, 1500);


        // setTimeout(() => {
        //   this.addSuccessmessage = false;
        //   this.closeButton.nativeElement.click();
        //   this.getStudentForm.resetForm();


        //   if (this.fileInput && this.fileInput.nativeElement) {
        //     this.fileInput.nativeElement.value = ''; // Clear file input value
        //   }    
        //   if (this.fileInput2 && this.fileInput2.nativeElement) {
        //     this.fileInput2.nativeElement.value = ''; // Clear file input value
        //   }   
        // }, 1000); 


        this.ngOnInit(); 
    });
  }


  // edit Data

  studentUpdate = {
    ID: "",
    PHOTO_PATH: "",
    SIGNATURE_PATH: "",
    STUDENT_NAME: "",
    STATUS: "",
    STUDENT_REGISTRATION: "",
    REGISTRATION_YEAR: "",
    BRANCH_NAME: "",
    BRANCH_ID: "",
    CURRENT_AY: "",
    AY: "",
    COLLEGE_ID: "",
    COLLEGE_NAME: "",
    CURRENT_SEM: "",
    SEM: "",
    FATHER_NAME: "",
    MOTHER_NAME: "",
    PH_NUMBER: "",
    EMAIL: "",
    ADHAAR_NO: "",
    DOB: "",
    ADDRESS: "",
    STATE: "",
    DISTRICT: "",
    PINCODE: "",
    GENDER: "",
    CATEGORY: "",
    IS_PWD: "",
    MARITAL_STATUS: "",
  }


  editBtn(showStudnt: any, event: Event) {
    this.studentUpdate = JSON.parse(JSON.stringify(showStudnt));
    this.studentUpdate.DOB = this.DateString(showStudnt.DOB) ?? "";
    console.log("showStudnt.DOB");
    console.log(showStudnt.DOB);
    console.log(showStudnt.SIGNATURE_PATH);
    console.log(showStudnt.PHOTO_PATH);
  }

  //Convert Date

  DateString(inputdate: Date | undefined): string | undefined {
    if (inputdate) {
      inputdate = new Date(inputdate);
      const _inputdate =
        inputdate.getFullYear().toString() +
        '-' +
        ('0' + (inputdate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + inputdate.getDate().toString()).slice(-2);
      return _inputdate;
    }
    return;
  }



  editStudent(formData: any) {

    console.log(formData.GENDER);


    const userId = getFromLocalStorage('userId');
    const isPwd = !!formData.IS_PWD;
    const maritalStatus = !!formData.MARITAL_STATUS;

    const data = new FormData();

    // Add key-value pairs to the FormData object
    data.append('ID', formData.ID);
    data.append('STUDENT_REGISTRATION', formData.STUDENT_REGISTRATION);
    data.append('STUDENT_NAME', formData.STUDENT_NAME);
    data.append('REGISTRATION_YEAR', formData.REGISTRATION_YEAR);
    data.append('BRANCH_ID', formData.BRANCH_ID);
    data.append('CURRENT_AY', formData.CURRENT_AY);
    data.append('CURRENT_SEM', formData.CURRENT_SEM);
    data.append('COLLEGE_ID', formData.COLLEGE_ID);
    data.append('FATHER_NAME', formData.FATHER_NAME);
    data.append('MOTHER_NAME', formData.MOTHER_NAME);
    data.append('PH_NUMBER', formData.PH_NUMBER);
    data.append('EMAIL', formData.EMAIL);
    data.append('ADHAAR_NO', formData.ADHAAR_NO);
    data.append('DOB', formData.DOB);
    data.append('ADDRESS', formData.ADDRESS);
    data.append('STATE', formData.STATE);
    data.append('DISTRICT', formData.DISTRICT);
    data.append('PINCODE', formData.PINCODE);
    data.append('GENDER', formData.GENDER);
    data.append('CATEGORY', formData.CATEGORY);
    data.append('IS_PWD', formData.IS_PWD,);
    data.append('MARITAL_STATUS', formData.MARITAL_STATUS);

    // Check if a file is selected before adding it to FormData
    if (this.selectedFile) {
      data.append('PHOTO_PATH', this.selectedFile, this.selectedFile.name);
    }
    if (this.selectedFile2) {
      data.append('SIGNATURE_PATH', this.selectedFile2, this.selectedFile2.name);
    }
    data.append('STATUS', 'true');
    if (userId !== null) {
      data.append('ADDEDBY', userId);
    }
    if (userId !== null) {
      data.append('UPDATEDBY', userId);
    }
    data.append('MODE', 'U');
    // Send a POST request with the FormData
    return this.http.post<any>(this.url, data);
  }


  studentFormeditdata(data: any) {
    this.loading = true;
    // this.isSubmit = true;
    this.editStudent(data).subscribe((resp: any)=>{

      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage=true;  
        this.loading = false; 
      }
      else{
        this.errorMessage=true;   
        this.loading = false; 
      }
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errorMessage = false;
        this.closeButton2.nativeElement.click();
        this.studentFormedit.resetForm();

          if (this.fileInput && this.fileInput.nativeElement) {
            this.fileInput.nativeElement.value = ''; // Clear file input value
          }    
          if (this.fileInput2 && this.fileInput2.nativeElement) {
            this.fileInput2.nativeElement.value = ''; // Clear file input value
          }   
      }, 1500);

      // this.addSuccessmessage = true;
      // this.loading = false;
      //   setTimeout(() => {
      //     this.addSuccessmessage = false;
      //     this.closeButton2.nativeElement.click();
      //     this.studentFormedit.resetForm();
      //   }, 1000); 
        this.ngOnInit();



    });    
  }

  // active / deactive Data

  actvinactv(showStudnt: any, event: Event) {
    this.studentUpdate = showStudnt;
  }

  studentStstusFormData() {
    this.loading = true;
    this.serviceData.statusStudent(this.studentUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton3.nativeElement.click();
        }, 1000); 
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }


  // *************bulk upload***********

  url4 = environment.baseUrl + "api/BulkStudentUpload/BulkStudentUpload";

  // selectedFile: File = null;
  fd = new FormData();

  onFileSelected3(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  userbulklistFormData() {
    const token = localStorage.getItem("token");
    this.http.post(this.url4, this.fd, {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    }).subscribe(
      (resp) => {
        console.log(resp);
        this.addSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton4.nativeElement.click();
          this.userbulklistForm.resetForm();
        }, 1000); 
      },
      (err) => {
        console.log(err);
        this.errorMessage = true;
        //   setTimeout(function() {
        //     window.location.reload();
        // }, 1000);
      }
    );
  }

  // *************bulk upload end***********


}
