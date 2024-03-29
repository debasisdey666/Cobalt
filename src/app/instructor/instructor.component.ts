import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { InstructorService } from '../services/instructor.service';
import { BranchService } from '../services/branch.service';
import { CollegeService } from '../services/college.service';
import { PaperService } from 'src/app/services/paper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  // @ViewChild('getInstructorForm') getInstructorForm!: NgForm;
  @ViewChild('editInstructorForm') editInstructorForm!: NgForm;
  // @ViewChild('getInstructorForm') getInstructorForm!: NgForm;

  url=environment.baseUrl+"api/Instructor";
  

  constructor(
    private serviceData:InstructorService,
    private serviceData2:BranchService,
    private serviceData3:CollegeService,
    private serviceData4:PaperService,
    private http:HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    
    this.getInstructorForm = {
      NAME: '',
      BRANCH_ID: '',
      COLLEGE_ID: '',
      // Other form fields...
      showpr: [] // Initialize an array for checkbox data
    };

    this.setMaxDate();
   }

   maxDate: string = '';

  showInstructor:any;
  showBranch:any;
  showBranchData:any;
  showCTData:any;
  showCollegeType:any;
  getInstructorForm:any;
  showPaper:any;
  showpr:any[] = [];
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  parsedFormattedPapers: any[] = [];
  showIns: any[] = [];
  searchText: string = '';
  loading: boolean = false;  
  errormessage: boolean = false;

  item:any[] = [];
  pageOfItems: any[] = [];
  filteredItems: any[] = [];
  searchFilters: { [key: string]: string } = {};

  totalPages: any;
  pageSize: number = 3;
  currentPage: number = 1;
  pageRange: number = 3;
  itemsPerPage: number = 4;

  instrucCount: number = 0; // Initialize the property
  selectedPaper: any;


  ngOnInit(): void {
    this.serviceData.showInstructor().subscribe((data) => {
      this.showInstructor = data;
      this.showIns =  this.showInstructor['Data'];

      this.updateFilteredItems();

      console.log("this.showIns");
      console.log(this.showIns);
      console.log(this.showIns[0].PAPERDETAILS);

      this.instrucCount = this.showIns.length;
      console.log("studentCount" + this.instrucCount)
      console.log("totalPages" + this.instrucCount);
      this.totalPages = Math.ceil(this.instrucCount / 3);
    })

    this.serviceData2.showBranchTrue().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })
    this.serviceData3.showCollegeTypeTrue().subscribe((data) => {
      this.showCTData = data;
      this.showCollegeType =  this.showCTData['Data'];
    })
    
    this.serviceData4.showPaperTrue().subscribe((data) => {
      this.showPaper = data;
      this.showpr =  this.showPaper['Data'];
      console.log(this.showpr);
    })
    
  }


  toggleReadMore(paper: any) {
    paper.show = !paper.show;
  }

   
  

  



  // exportToExcel(): void {
  //   console.log('Exporting to Excel...');
  //   console.log('Page of Items:', this.pageOfItems);
  
  //   if (this.pageOfItems.length > 0) {
  //     const dataToExport = this.pageOfItems.map(instructor => {
  //       const paperNames = instructor.PAPERDETAILS.map((paper: { PAPER_NAME: any; }) => paper.PAPER_NAME).join(', ');
  //       const formattedDOB = formatDate(instructor.DOB, 'dd-MM-yyyy', 'en-US');
  //       return {
  //         'Name': instructor.NAME,
  //         'Phone Number': instructor.PH_NUMBER,
  //         'Email': instructor.EMAIL,
  //         'Date of Birth': formattedDOB,
  //         'Papers': paperNames,
  //         'Status': instructor.STATUS ? 'Active' : 'Inactive'
  //       };
  //     });
  
  //     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  //     try {
  //       // Save the Excel file
  //       XLSX.writeFile(wb, 'faculty-data.xlsx');
  //       console.log('Excel file saved successfully.');
  //     } catch (error) {
  //       console.error('Error saving Excel file:', error);
  //     }
  //   } else {
  //     console.warn('Page of Items array is empty. No data to export.');
  //   }
  // }



  // Fetch and store data for all pages
fetchAllData(): void {
  // Your logic to fetch data for all pages and store it in a single array
}

// exportToExcel(): void {
//   console.log('Exporting to Excel...');

//   if (this.showIns.length > 0) {
//     const dataToExport = this.showIns.map(instructor => {
//       const paperNames = instructor.PAPERDETAILS.map((paper: { PAPER_NAME: any; }) => paper.PAPER_NAME).join(', ');
//       const formattedDOB = formatDate(instructor.DOB, 'dd-MM-yyyy', 'en-US');
//       return {
//         'Name': instructor.NAME,
//         'Phone Number': instructor.PH_NUMBER,
//         'Email': instructor.EMAIL,
//         'Date of Birth': formattedDOB,
//         'Papers': paperNames,
//         'Status': instructor.STATUS ? 'Active' : 'Inactive'
//       };
//     });

//     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     try {
//       // Save the Excel file
//       XLSX.writeFile(wb, 'faculty-data.xlsx');
//       console.log('Excel file saved successfully.');
//     } catch (error) {
//       console.error('Error saving Excel file:', error);
//     }
//   } else {
//     console.warn('No data to export.');
//   }
// }

  

exportToExcel(): void {
  console.log('Exporting to Excel...');
  console.log('Filtered Items:', this.filteredItems);

  if (this.filteredItems.length > 0) {
    const dataToExport = this.filteredItems.map(instructor => {
      const paperNames = instructor.PAPERDETAILS.map((paper: { PAPER_NAME: any; }) => paper.PAPER_NAME).join(', ');
      const formattedDOB = formatDate(instructor.DOB, 'dd-MM-yyyy', 'en-US');
      return {
        'Name': instructor.NAME,
        'Phone Number': instructor.PH_NUMBER,
        'Email': instructor.EMAIL,
        'Date of Birth': formattedDOB,
        'Papers': paperNames,
        'Status': instructor.STATUS ? 'Active' : 'Inactive'
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    try {
      // Save the Excel file
      XLSX.writeFile(wb, 'faculty-data.xlsx');
      console.log('Excel file saved successfully.');
    } catch (error) {
      console.error('Error saving Excel file:', error);
    }
  } else {
    console.warn('Filtered Items array is empty. No data to export.');
  }
}




    

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


    
  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pageRange / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);
  
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }
  
    return visiblePages;
  }
   


    updateFilteredItems() {
      // If search filters are present, filter the data
      if (Object.values(this.searchFilters).some(filter => !!filter)) {
        this.filteredItems = this.showIns.filter((item) =>
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
        this.filteredItems = this.showIns.slice();
      }
    
      this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
      this.pageOfItems = this.paginate(this.filteredItems, this.currentPage, this.itemsPerPage);
    
      // Update studentCount after filtering
      // this.studentCount = this.filteredItems.length;
    }
    


    // paginate(array: any[], pageNumber: number, pageSize: number): any[] {
    //   return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    // }

    paginate(array: any[], pageNumber: number, pageSize: number): any[] {
      const startIndex = (pageNumber - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return array.slice(startIndex, endIndex);
    }
  
    // onChangePage(pageNumber: number): void {
    //   this.currentPage = pageNumber;
    //   console.log('Current Page:', this.currentPage);
    //   this.updateFilteredItems();
    // }

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
    pagesArray(): number[] {
      return Array(this.totalPages).fill(0).map((_, index) => index + 1);
    }
    onNextButtonClick(): void {
      if (this.currentPage < this.totalPages) {
        this.onChangePage(this.currentPage + 1);
      }
    }

     

     

    
     isAtLeastOneCheckboxChecked: boolean = false;
    logCheckboxState(papDropdwn: any) {
      console.log('Before Click - Is Checked:', papDropdwn.isChecked);
        
      // Toggle the checkbox state
      papDropdwn.isChecked = !papDropdwn.isChecked;

      this.isAtLeastOneCheckboxChecked = this.showpr.some(item => item.isChecked);
        
      console.log('After Click - Is Checked:', papDropdwn.isChecked);
      // ... rest of the code
    }
    

    logSelectedPapersAndFormattedPapers() {
      const selectedPapers = this.showpr.filter((papDropdwn) => papDropdwn.isChecked);
      console.log('Selected Papers:', selectedPapers);
  
      const formattedPapers = selectedPapers.map((papDropdwn) => ({
        papeR_ID: papDropdwn.ID,
      }));
      console.log('Formatted Papers:', formattedPapers);
    }

  getInstructorFormdata(data: any) {
    this.loading = true;

    this.addinstructor(data).subscribe((resp: any)=>{
      console.log(resp.StatusCode);

      if (resp.Res.StatusCode == 200 ){
        this.addSuccessmessage=true;  
        this.loading = false; 
      }
      else{
        this.errormessage=true;   
        this.loading = false; 
      }
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.errormessage = false;
        this.closeButton.nativeElement.click();
        this.getInstructorForm.resetForm();
      }, 1500);

      this.ngOnInit();

      console.log(data);
    })


  }



  
  addinstructor(formData: any) {
    const collegeIdAsNumber: number = Number(formData.COLLEGE_ID);
    const branchIdAsNumber: number = Number(formData.BRANCH_ID);


    const selectedPapers = this.showpr.filter((papDropdwn) => papDropdwn.isChecked);
    console.log('Selected Papers:', selectedPapers);

    const formattedPapers = selectedPapers.map((papDropdwn) => ({
      papeR_ID: papDropdwn.ID.toString(),
    }));
    console.log('Formatted Papers:', formattedPapers);
  
    const formattedPapersString = JSON.stringify(formattedPapers);
    const parsedFormattedPapers = JSON.parse(formattedPapersString);
  
    var data = {
      "id": 0,
      "NAME": formData.NAME,
      "BRANCH_ID": branchIdAsNumber,
      "COLLEGE_ID": collegeIdAsNumber,
      "PH_NUMBER": formData.PH_NUMBER,
      "EMAIL": formData.EMAIL,
      "DOB": formData.DOB,
      "GENDER": formData.GENDER,
      "status": true,
      "paperDetails": parsedFormattedPapers,
      "addedby": "1",
      "updatedby": "string",
      "mode": "A"
    };
  
    return this.http.post(this.url, data);

  }

  
     instructrUpdate = {
      ID: "",
      NAME: "",
      BRANCH_ID: "",
      COLLEGE_ID: "",
      GENDER: "",
      STATUS: "",
      EMAIL: "",
      PH_NUMBER: "",
      DOB: ""
    }

    
    paperNames: string[] = [];
    selectedPaperIDs: string[] = [];
    paperID: string[] = [];
  
    editBtn(showInstructr:any,event:Event){
      this.instructrUpdate= JSON.parse(JSON.stringify(showInstructr));
      this.instructrUpdate.DOB = this.DateString(showInstructr.DOB) ?? "";
      console.log(showInstructr.ID)

        // Get paper names from showInstructr.PAPERDETAILS
        this.paperNames = showInstructr.PAPERDETAILS.map((showInsPap: any) => showInsPap.PAPER_NAME);
        this.paperID = showInstructr.PAPERDETAILS.map((showInsPap: any) => showInsPap.PAPER_ID);
        console.log('Paper id:', this.paperID);

        this.selectedPaperIDs = this.paperID.slice(); // Copy the array

        console.log('Selected Paper IDs:', this.selectedPaperIDs);
        console.log('Paper IDs:', this.paperID);
    }

    

    isSelected(id: string): boolean { // Change the type to string
      // Check if the ID is in the array of selected paperIDs
      return this.selectedPaperIDs.includes(id);
    }

    atLeastOneCheckboxSelected(): boolean {
      // Check if at least one checkbox is selected
      return this.showpr.some(papDropdwn => this.isSelected(papDropdwn.ID.toString()));
    }
    
    toggleSelection(id: string): void { // Change the type to string
      // Toggle the selection by adding or removing the ID from the array
      

      const papDropdwn = this.showpr.find(item => item.PAPER_ID === id);

      papDropdwn.isChecked = !papDropdwn.isChecked;

      

      // Log the updated showpr array
      console.log('Updated showpr:', this.showpr);

      // Toggle the isChecked property
      if (papDropdwn) {
        papDropdwn.isChecked = !papDropdwn.isChecked;
      }
      // Toggle the selection by adding or removing the ID from the array
      if (this.selectedPaperIDs.includes(id)) {
        this.selectedPaperIDs = this.selectedPaperIDs.filter(selectedID => selectedID !== id);
      } else {
        this.selectedPaperIDs.push(id);
      }

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


    
    editInstructorFormdata(data:any){
      this.loading = true;
      // this.isSubmit=true;
      // this.editinstructor(data).subscribe(()=>{
      this.editInstructor(data).subscribe((resp: any)=>{
        console.log(resp.StatusCode);
  
        if (resp.Res.StatusCode == 200 ){
          this.addSuccessmessage=true;  
          this.loading = false; 
        }
        else{
          this.errormessage=true;   
          this.loading = false; 
        }
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.errormessage = false;
          this.closeButton2.nativeElement.click();
          // this.getInstructorForm.resetForm();
        }, 1500);
  
        this.ngOnInit();
  
        console.log(data);
      })  

      // this.editinstructor(data).subscribe((resp: any)=>{
      //   console.log(resp.StatusCode);
  
      //   if (resp.Res.StatusCode == 200 ){
      //     this.addSuccessmessage=true;  
      //     this.loading = false; 
      //   }
      //   else{
      //     this.errormessage=true;   
      //     this.loading = false; 
      //   }
      //   setTimeout(() => {
      //     this.addSuccessmessage = false;
      //     this.errormessage = false;
      //     this.closeButton2.nativeElement.click();
      //     // this.getInstructorForm.resetForm();
      //   }, 1500);
  
      //   this.ngOnInit();
  
      //   console.log(data);
      // })





    }

    

    

      logCheckboxStateEdit(event: Event, papDropdwn: any) {
        console.log('Before Click - Is Checked:', papDropdwn.isChecked);
      
        // Toggle the checkbox state based on the event
        papDropdwn.isChecked = (event.target as HTMLInputElement).checked;
      
        console.log('After Click - Is Checked:', papDropdwn.isChecked);
      
        console.log('Before Removal - Selected Paper IDs:', this.selectedPaperIDs);
      
        // Update the list of selectedPaperIDs based on the checkbox state
        if (papDropdwn.isChecked) {
          // Add the paper ID to the list if checked
          const paperIdString = papDropdwn.ID.toString();
          if (!this.selectedPaperIDs.includes(paperIdString)) {
            this.selectedPaperIDs.push(paperIdString);
          }
        } else {
          // Remove the paper ID from the list if unchecked
          const paperIdString = papDropdwn.ID.toString();
          this.selectedPaperIDs = this.selectedPaperIDs.filter((id: string) => id !== paperIdString);
        }
      
        console.log('After Removal - Selected Paper IDs:', this.selectedPaperIDs);
      
        // ... rest of the code
      }


      editInstructor(formData: any) {
        const collegeIdAsNumber: number = Number(formData.COLLEGE_ID);
        const branchIdAsNumber: number = Number(formData.BRANCH_ID);
      
        console.log('Paper IDs:', this.paperID);
        console.log('selectedPaperIDs:', this.selectedPaperIDs);
      
        
        this.paperID = [...new Set([...this.selectedPaperIDs])];
      
        console.log('Merged Paper IDs:', this.paperID);
      
        // Format the merged paper IDs
        const formattedPapers = this.paperID.map((paperID: string) => ({
          paper_ID: paperID.toString(),
        }));
      
        console.log('Formatted Papers:', formattedPapers);
      
        const formattedPapersString = JSON.stringify(formattedPapers);
        const parsedFormattedPapers = JSON.parse(formattedPapersString);
      
        const data = {
          ID: formData.ID,
          NAME: formData.NAME,
          BRANCH_ID: branchIdAsNumber,
          COLLEGE_ID: collegeIdAsNumber,
          PH_NUMBER: formData.PH_NUMBER,
          EMAIL: formData.EMAIL,
          DOB: formData.DOB,
          GENDER: formData.GENDER,
          status: true,
          paperDetails: parsedFormattedPapers,
          addedby: "1",
          updatedby: "1",
          mode: "U",
        };
      
        return this.http.post(this.url, data);
      }

   

  actvinactv(showInstructr:any,event:Event){
    this.instructrUpdate= showInstructr;
    console.log(showInstructr.ID);
  }

  InstructorFormData() {
    this.loading = true;
    this.serviceData.statusInst(this.instructrUpdate).subscribe(
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
}
