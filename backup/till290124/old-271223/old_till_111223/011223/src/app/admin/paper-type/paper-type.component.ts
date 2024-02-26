import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaperTypeService } from '../../services/paper-type.service';

@Component({
  selector: 'app-paper-type',
  templateUrl: './paper-type.component.html',
  styleUrls: ['./paper-type.component.css']
})
export class PaperTypeComponent implements OnInit {

  

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(private serviceData:PaperTypeService) { } 

  showPapertype:any;
  showPTData:any;  
  isSubmit = false;
  addSuccessmessage: boolean = false;
  updateSuccessmessage: boolean = false;

  ngOnInit(): void {

    this.serviceData.showPapertype().subscribe((data) => {
      this.showPTData = data;
      this.showPapertype =  this.showPTData['Data'];
      console.log(this.showPapertype);
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
   getPapertypeFormdata(data: any) {
    this.isSubmit = true;
    this.serviceData.addPapertype(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function () {
        window.location.reload();
      }, 500);

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
    this.isSubmit = true;
    this.serviceData.editPapertype(data).subscribe((result) => {
      this.addSuccessmessage = true;
      this.ngOnInit();
      setTimeout(function () {
        window.location.reload();
      }, 500);
      console.log(data);
    })
  }




  // active / deactive Data

  actvinactv(showPT:any,event:Event){
    this.paperTypeUpdate= showPT;
  }

  papertypeStstusFormData() {

    this.serviceData.statusPapertype(this.paperTypeUpdate).subscribe(
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
