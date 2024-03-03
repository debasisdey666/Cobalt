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
  isButtonEnabled: boolean = true;
  moreInfo: boolean = false;
  clearenceDataResponse: any;
  clearenceData: any

  constructor(private clearenceService: StudentClearenceService) { }

  ngOnInit(): void {
  }

  saveFormData(){
    if(this.formData.regNumber != ''){
      this.registrationNumber = this.formData.regNumber;
      // calling the api
      this.clearenceService.showClearence(this.registrationNumber).subscribe((res: any) => {
        this.clearenceDataResponse = res;
        this.clearenceData = this.clearenceDataResponse['Data'];
        this.moreInfo = true;
      })
    }
  }

  onCheckboxChange(checkboxNumber: any) {
    if(checkboxNumber == 1){
      !this.feesChecked;
    }
    if(checkboxNumber == 2){
      !this.paperChecked;
    }
    if(checkboxNumber == 3){
      !this.libraryChecked;
    }
 
    if(this.feesChecked == true && this.paperChecked == true && this.libraryChecked == true){
      this.isButtonEnabled = false;
    }
    else{
      this.isButtonEnabled = true;
    }
  }

}
