import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BookissueService } from '../../services/bookissue.service';

@Component({
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
  styleUrls: ['./book-issue.component.css']
})
export class BookIssueComponent implements OnInit {



  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('editreturnBookIs') editreturnBookIs!: NgForm;


  constructor(private serviceData: BookissueService) { 
    this.returnBkupdate.DUE_DATE = new Date().toISOString().slice(0, 10);
  }

  showBIssData:any;
  showBookIssueAll:any;
  showBMData:any;
  showBookMaster:any;
  buttonDisabled: boolean = false;  
  errorMessage: boolean = false;
  isSubmit = false;
  addSuccessmessage: boolean = false;
  errormessage: boolean = false;
  updateSuccessmessage: boolean = false;
  loading: boolean = false;

  
  
  ngOnInit(): void {
    // this.serviceData.showBookIssued().subscribe((data) => {
    //   this.showBIssData = data;
    //   this.showBookIssueAll = this.showBIssData['Data'];
    //   console.log("this.showBookIssueAll");
    //   console.log(this.showBIssData);
    // })
    this.serviceData.showBookIssued().subscribe((data) => {
      this.showBIssData = data;
      this.showBookIssueAll = this.showBIssData['Data'];
      console.log("this.showBookIssueAll");
      console.log(this.showBookIssueAll);
    })
    this.serviceData.showBookMaster().subscribe((data) => {
      this.showBMData = data;
      this.showBookMaster = this.showBMData['Data'];
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

   studenT_REG: string = '';
   booK_ID: string = '';


   searchBkIssueAll(formData: any) {

    this.errorMessage = false;  
    this.showBIssData =[];
    console.log('Form submitted!');
    this.serviceData.showBookIssuedStudent(formData).subscribe((data) => {    

      this.showBIssData = data;
      this.showBookIssueAll =  this.showBIssData['Data'];
      console.log("Library Defaulter");
      console.log(this.showBookIssueAll);


      if(this.showBookIssueAll.length > 0){      
        console.log("data");
        this.errorMessage = false;  
      }
      else{
        this.showBookIssueAll =[];
        console.log("no data");
        this.errorMessage = true;  
      }

    })
  }


 // edit Data

 returnBkupdate = {
  ID: "",
  DUE_DATE: "",
  FINE_AMOUNT: "",
}

editBtn(showBM: any, event: Event) {
  this.returnBkupdate = JSON.parse(JSON.stringify(showBM));
  console.log(showBM.ID)
  console.log(showBM.STUDENT_REG)
  console.log(showBM.BOOK_NAME)
  console.log(showBM.DUE_DATE)
}

isDueDateGreaterThanToday(): boolean {
  const dueDate = new Date(this.returnBkupdate.DUE_DATE);
  const today = new Date();
  return dueDate < today;
}

editreturnBookIssued(formData: any) {
  // this.loading = true;
  // this.isSubmit = true;
  this.serviceData.returnBookIssued(formData).subscribe((resp: any)=>{
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
      this.closeButton.nativeElement.click();
      this.editreturnBookIs.resetForm();
    }, 1000);
    this.ngOnInit();
    console.log(formData);
  })
}


}
