import { Component, OnInit } from '@angular/core';
import { StudentClearenceService } from 'src/app/services/student-clearence.service';

@Component({
  selector: 'app-student-clearence',
  templateUrl: './student-clearence.component.html',
  styleUrls: ['./student-clearence.component.css']
})
export class StudentClearenceComponent implements OnInit {

  // declarations
  formData: any = {
    regNumber: ''
  };
  registrationNumber: any;
  feesChecked: boolean = false
  paperChecked: boolean = false
  libraryChecked: boolean = false
  isButtonDisabled: boolean = true;
  moreInfo: boolean = false;
  clearenceDataResponse: any;
  clearenceData: any
  feesStatus!: string;
  paperStatus!: string;
  feesClearenceData: any;
  paperClearenceData: any;
  showPaymentDetails: boolean = false;
  showPaperDetails: boolean = false;
  feesClearenceModalHeader: string = "FEES CLEARENCE";
  paperClearenceHeader: string = "PAPER CLEARENCE";
  disableCheckBox: boolean = false;

  constructor(private clearenceService: StudentClearenceService) { }

  ngOnInit(): void {
  }

  // getting the data 
  getClearenceData(): void {
    if (this.formData.regNumber != '') {
      // Getting the data for fees clearence
      this.clearenceService.getClearence(this.formData.regNumber, 1).subscribe((res: any) => {
        this.feesClearenceData = res;

        // Getting the data for paper clearence
        this.clearenceService.getClearence(this.formData.regNumber, 2).subscribe((res: any) => {
          this.paperClearenceData = res;
          this.moreInfo = true;

          // checking for fees clearence
          if (this.feesClearenceData.Student_Payment_Clearance[0].PAYMENT_STATUS > 0) {
            this.feesStatus = "YES"
            this.showPaymentDetails = false;
          }
          else {
            this.feesStatus = "NO";
            this.showPaymentDetails = true;
          }

          // checking for paper clearence
          if (this.paperClearenceData.Student_Paper_Clearance[0].PAPER_CLEARANCE > 0) {
            this.paperStatus = "YES"
            this.showPaperDetails = false;
          }
          else {
            this.paperStatus = "NO";
            this.showPaperDetails = true;
          }

          // calling API for checking checkbox
          this.clearenceService.getClearenceStatus(this.formData.regNumber).subscribe((res: any) => {
            // Data null and both clearence yes - normal way
            if((res.Data == null || res.Data.length == 0 || res == null) && (this.paperStatus == 'YES' && this.feesStatus == 'YES')){
              this.feesChecked = false
              this.paperChecked = false
              this.libraryChecked = false
              this.disableCheckBox = false
              this.isButtonDisabled = false;      
            }
            // Data null and both clearence no - cannot submit
            if((res.Data == null || res.Data.length == 0 || res == null) && (this.paperStatus == 'YES' && this.feesStatus == 'YES')){
              this.feesChecked = false
              this.paperChecked = false
              this.libraryChecked = false
              this.disableCheckBox = true
              this.isButtonDisabled = true;      
            }
            // Data not null and both clearence no - cannot submit
            else if((res.Data != null || res.Data.length != 0 || res != null) && (this.paperStatus == 'NO' && this.feesStatus == 'NO')){
              this.feesChecked = false
              this.paperChecked = false
              this.libraryChecked = false
              this.disableCheckBox = true
              this.isButtonDisabled = true
            }
            // Data not null and both clearence yes - already submitted
            else if((res.Data != null || res.Data.length != 0 || res != null) && (this.paperStatus == 'YES' && this.feesStatus == 'YES')){
              this.feesChecked = true
              this.paperChecked = true
              this.libraryChecked = true
              this.disableCheckBox = true
              this.isButtonDisabled = true
            }
            // else{
            //   this.feesChecked = true
            //   this.paperChecked = true
            //   this.libraryChecked = true
            //   this.disableCheckBox = true
            //   this.isButtonEnabled = true
            // }
          })
        })
      })


    }
  }

  saveFormData() {
    if (this.formData.regNumber != '') {
      this.registrationNumber = this.formData.regNumber;
      // calling the api to save data
      this.clearenceService.saveClearence(this.registrationNumber).subscribe((res: any) => {
        this.clearenceDataResponse = res;
        this.clearenceData = this.clearenceDataResponse['Data'];
        alert("Submitted Successfully")
        this.getClearenceData();
      })
    }
  }

  onCheckboxChange(checkboxNumber: any) {
    if (checkboxNumber == 1) {
      !this.feesChecked;
    }
    if (checkboxNumber == 2) {
      !this.paperChecked;
    }
    if (checkboxNumber == 3) {
      !this.libraryChecked;
    }

    if (this.feesChecked == true && this.paperChecked == true && this.libraryChecked == true) {
      this.isButtonDisabled = false;
    }
    else {
      this.isButtonDisabled = true;
    }
  }

}
