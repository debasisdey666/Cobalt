import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaperTypeService } from '../../services/paper-type.service';

@Component({
  selector: 'app-paper-type',
  templateUrl: './paper-type.component.html',
  styleUrls: ['./paper-type.component.css']
})
export class PaperTypeComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('getPapertypeForm') getPapertypeForm!: NgForm;
  @ViewChild('paperTypeFormedit') paperTypeFormedit!: NgForm;

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(private serviceData:PaperTypeService) { } 

  showPapertype:any;
  showPTData:any;  
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {

    this.serviceData.showPapertype().subscribe((data) => {
      this.showPTData = data;
      this.showPapertype =  this.showPTData['Data'];
      console.log(this.showPapertype);
    })
  }

  
    // Pagination
  
    pageSize =6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }

   


   // Add Data
   getPapertypeFormdata(data: any) {
    // this.isSubmit = true;
    this.loading = true;
    this.serviceData.addPapertype(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton.nativeElement.click();
        this.getPapertypeForm.resetForm();
      }, 1000);
      this.ngOnInit(); 

      console.log(data);
    })
  }


   // edit Data

   paperTypeUpdate = {
    ID:"",
    PAPER_TYPE: "",
    DESCRIPTION: "",
    STATUS: "",
  }

 


  editBtn(showPT: any, event: Event) {
    this.paperTypeUpdate = JSON.parse(JSON.stringify(showPT));
    console.log(showPT.ID)
  }


  paperTypeFormeditdata(data: any) {
    // this.isSubmit = true;
    this.loading = true;
    this.serviceData.editPapertype(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.loading = false;
      setTimeout(() => {
        this.addSuccessmessage = false;
        this.closeButton2.nativeElement.click();
        this.paperTypeFormedit.resetForm();
      }, 1000);
      this.ngOnInit(); 
      console.log(data);
    })
  }




  // active / deactive Data

  actvinactv(showPT:any,event:Event){
    this.paperTypeUpdate= showPT;
  }

  papertypeStstusFormData() {
    this.loading = true;
    this.serviceData.statusPapertype(this.paperTypeUpdate).subscribe(
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
