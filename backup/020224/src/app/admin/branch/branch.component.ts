import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BranchService } from 'src/app/services/branch.service';
import { ProgrammeService } from '../../services/programme.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('branchForm') branchForm!: NgForm;
  @ViewChild('branchFormedit') branchFormedit!: NgForm;

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(
    private serviceData:BranchService,
    private serviceData2:ProgrammeService,
    ) { }

  showBranch:any;
  showBranchData:any;
  isSubmit=false;  
  addSuccessmessage:boolean=false;
  updateSuccessmessage:boolean=false;
  showProgrammeTrue:any;
  showPgm:any;
  loading: boolean = false;

  ngOnInit(): void {
    this.serviceData.showBranch().subscribe((data) => {
      this.showBranchData = data;
      this.showBranch =  this.showBranchData['Data'];
    })

    this.serviceData2.showProgrammeTrue().subscribe((data) => {
      this.showProgrammeTrue = data;
      this.showPgm =  this.showProgrammeTrue['Data'];
     // console.log(this.showPgm);
    })

  }


   // Pagination
  
   pageSize =3;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }
  
   // Add Data
   getBranchFormdata(data:any){
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.addBranch(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.branchForm.resetForm();
      }, 1000); 
      this.ngOnInit(); 

      console.log(data);
    })  
  }

  // edit Data

  branchUpdate = {
    "ID": 0,
    "BRANCH_CODE":"",
    "BRANCH_NAME":"",
    "PROGRAMME_ID":"", 
    "STATUS": "",
    "ADDEDBY": "",
    "UPDATEDBY": "",
  }

  editBtn(showBranchdata:any,event:Event){
    this.branchUpdate= JSON.parse(JSON.stringify(showBranchdata));
    console.log(showBranchdata.ID)
  }

   
  branchFormeditdata(data:any){ 
    this.loading = true;
    // this.isSubmit=true;
    this.serviceData.editBranch(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.branchFormedit.resetForm();
      }, 1000); 
      this.ngOnInit(); 
      console.log(data);
    })  
  }

  // active / deactive Data

  actvinactv(showBranchdata:any,event:Event){
    this.branchUpdate= showBranchdata;
    console.log(showBranchdata.ID);
  }

  branchtypeFormData() {
    this.loading = true;
    this.serviceData.statusBranch(this.branchUpdate).subscribe(
      
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
