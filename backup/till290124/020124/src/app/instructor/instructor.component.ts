import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../services/instructor.service';
import { BranchService } from '../services/branch.service';
import { CollegeService } from '../services/college.service';
import { PaperService } from 'src/app/services/paper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {

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
   }

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


  ngOnInit(): void {
    this.serviceData.showInstructor().subscribe((data) => {
      this.showInstructor = data;
      this.showIns =  this.showInstructor['Data'];
      console.log("this.showIns");
      console.log(this.showIns);
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

     // Pagination  
     pageSize =5;
     items = [];
     pageOfItems: Array<any> | undefined;
   
     onChangePage(pageOfItems: Array<any>) {
       this.pageOfItems = pageOfItems;
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
    this.isSubmit = true;
    this.addinstructor(data).subscribe(() => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
      }, 500);
  
      console.log(data);
    });
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
      this.isSubmit=true;
      // this.editinstructor(data).subscribe(()=>{
      this.editInstructor(data).subscribe(()=>{
        this.addSuccessmessage=true;
        this.ngOnInit();
        setTimeout(function() {
          window.location.reload();
      }, 500);
        console.log(data);
      })  
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

    this.serviceData.statusInst(this.instructrUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        setTimeout(function () {
          window.location.reload();
        }, 500);
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
