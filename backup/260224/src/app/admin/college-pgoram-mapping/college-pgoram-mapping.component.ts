import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CollegeProgrmService } from '../../services/college-progrm.service';
import { CollegeService } from '../../services/college.service';
import { ProgrammeService } from '../../services/programme.service';
import { NgForm } from '@angular/forms';
import { getFromLocalStorage } from '../../../environments/local-storage-util';

@Component({
  selector: 'app-college-pgoram-mapping',
  templateUrl: './college-pgoram-mapping.component.html',
  styleUrls: ['./college-pgoram-mapping.component.css']
})
export class CollegePgoramMappingComponent implements OnInit {

  
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('getClgPgrgForm') getClgPgrgForm!: NgForm;

  constructor(
    private serviceData: CollegeProgrmService,
    private serviceData2: CollegeService,
    private serviceData3: ProgrammeService,
  ) { }

  showCollgeProgrmpping: any;
  showCollgeProgrm: any;
  showClg: any;
  showClgnm: any;
  showPrgrm: any;
  showPrgramme: any;
  checkboxValue: any;
  showClgPrgMap: any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.serviceData.showCollegeProgrammMapping().subscribe((data) => {
      this.showCollgeProgrm = data;
      this.showCollgeProgrmpping = this.showCollgeProgrm['Data'];
      console.log('this.showCollgeProgrmpping');
      console.log(this.showCollgeProgrmpping);
    })
    this.serviceData2.showCollegeType().subscribe((data) => {
      this.showClg = data;
      this.showClgnm = this.showClg['Data'];
      console.log(this.showClgnm);
    })
    this.serviceData3.showProgramme().subscribe((data) => {
      this.showPrgrm = data;
      this.showPrgramme = this.showPrgrm['Data'];
      console.log(this.showPrgramme);
    })
  }


  // Add Data
  getClgPgrgFormdata() {
    this.loading = true;
    var x = $("#studenpaper li").length;
    var PROGRAMME_ID = [];
    console.log("out");
    for (let i = 1; i < x; i++) {
      let input = $('#PROGRAMME_ID' + i);
      console.log(input.val());
      if (input.is(':checked')) PROGRAMME_ID.push(input.val());
      console.log(input.val());
    }

    const data = this.createFormData([PROGRAMME_ID.toString()]);
    this.serviceData.addCollegeProgrammMapping(data).subscribe((result) => {
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        // this.getClgPgrgForm.resetForm();
      }, 1000); 
      this.ngOnInit();
    });
  }


  selectedPaperIds: string[] = [];
  // Helper function to get selected PROGRAMME_ID
  getSelectedPaperIds() {
    return this.showClgPrgMap
      .filter((showClgPrgMap: { PROGRAMME_ID: any; }) => showClgPrgMap.PROGRAMME_ID)
      .map((showClgPrgMap: { PROGRAMME_ID: any; }) => `ID-${showClgPrgMap.PROGRAMME_ID}`);
  }

  // Helper function to create the payload with selected PROGRAMME_ID
  // selectedCollegeId: string = '';
  selectedCollegeId: number = 37;

  createFormData(selectedPaperIds: string[]) {
    const userId = getFromLocalStorage('userId');
    var stringArray = selectedPaperIds[0].split(",");
    var obj = {
      id: 0,
      collegE_ID: this.selectedCollegeId,
      programmedetail: stringArray.map((PROGRAMME_ID: any) => ({
        PROGRAMME_ID: PROGRAMME_ID
      })),
      "status": true,
      "addedby": userId,
      "updatedby":userId,
      "mode": "A"
    };
    return obj;
  }




}
