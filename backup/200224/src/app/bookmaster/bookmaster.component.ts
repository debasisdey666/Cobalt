import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookmasterService } from '../services/bookmaster.service';

@Component({
  selector: 'app-bookmaster',
  templateUrl: './bookmaster.component.html',
  styleUrls: ['./bookmaster.component.css']
})
export class BookmasterComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('bookmasterForm') bookmasterForm!: NgForm;
  @ViewChild('bookmasterFormedit') bookmasterFormedit!: NgForm;

  resetFormValue(myForm: NgForm) {
    myForm.resetForm()
  }

  constructor(private serviceData: BookmasterService) { }

  showBookMaster: any;
  showBMData: any;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  errormessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.serviceData.showBookMaster().subscribe((data) => {
      this.showBMData = data;
      this.showBookMaster = this.showBMData['Data'];
      console.log("this.showBookMaster");
      console.log(this.showBookMaster);
    })
  }

  // Pagination

  pageSize = 6;
  items = [];
  pageOfItems: Array<any> | undefined;

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
// Add Data
getBMFormdata(data: any) {
  this.loading = true;
  // this.isSubmit = true;
  this.serviceData.addBM(data).subscribe((resp: any)=>{
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
      this.bookmasterForm.resetForm();
    }, 1000);
    this.ngOnInit();

    console.log(data);
  })
}

 // edit Data

 bookmasterUpdate = {
  ID: "",
  BOOK_NAME: "",
  AUTHOR_NAME: "",
  COPIES: "",
  RACK_NO: "",
  ISBN: "",
  PUBLISHER: "",
  EDITION: "",
  COST: "",
  STATUS: true,
  ADDEDBY: "",
  UPDATEDBY: ""
}

editBtn(showBM: any, event: Event) {
  this.bookmasterUpdate = JSON.parse(JSON.stringify(showBM));
  console.log(showBM.ID)
}


bookmasterFormeditdata(data: any) {
  this.loading = true;
  // this.isSubmit = true;
  this.serviceData.editBM(data).subscribe((resp: any)=>{
    if (resp.Res.StatusCode == 200 ){
      this.addSuccessmessage=true;  
      this.loading = false; 
      this.ngOnInit();
    }
    else{
      this.errormessage=true;   
      this.loading = false; 
      this.ngOnInit();
    }
    setTimeout(() => {
      this.addSuccessmessage = false;
      this.errormessage=false; 
      this.closeButton2.nativeElement.click();
      this.bookmasterFormedit.resetForm();
    }, 1000);
    this.ngOnInit();
    console.log(data);
  })
}

// active / deactive Data

actvinactv(showBM: any, event: Event) {
  this.bookmasterUpdate = showBM;
}

bookmasterFormData() {
  this.loading = true; 
  this.serviceData.statusBM(this.bookmasterUpdate).subscribe(
    (resp) => {
      console.log(resp);
      this.loading = false;  
      this.updateSuccessmessage = true;
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
