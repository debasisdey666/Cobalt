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
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('editreturnBookIs') editreturnBookIs!: NgForm;
  @ViewChild('addbookIssueForm') addbookIssueForm!: NgForm;

  resetFormValue(myForm: NgForm) {
    myForm.resetForm()
  }
  maxDate: string = '';

  constructor(private serviceData: BookissueService) { 
    this.returnBkupdate.DUE_DATE = new Date().toISOString().slice(0, 10);

    this.setMaxDate();
  }

  showBIssData:any;
  showBookIssueAll:any;
  showBMData:any;
  showBookMaster:any;
  duE_DATE: any;
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

   pageSize = 10;
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
  // return dueDate < today
  // Set hours, minutes, seconds, and milliseconds to 0 for both dates
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Compare the timestamps of dueDate and today
  // Also check if the dueDate is not equal to today
  return dueDate.getTime() < today.getTime() && dueDate.getDate() !== today.getDate();

}


addbookIssueFormdata(formData: any) {
  this.loading = true;
  // this.isSubmit = true;
  this.serviceData.addBookIssued(formData).subscribe((resp: any)=>{
    if (resp.Res.StatusCode == 200 ){ 
       
      this.loading = false; 
      this.addSuccessmessage=true; 
      this.ngOnInit();
    }
    if (resp.Res.StatusCode == 500 ){ 
      this.loading = false;
      this.errormessage=true; 
      this.ngOnInit();
    }
    else{
      this.errormessage=true;   
      this.loading = false; 
      this.ngOnInit();
    }
    setTimeout(() => {
      this.loading = false; 
      this.addSuccessmessage = false;
      this.errormessage=false; 
      this.closeButton2.nativeElement.click();
      this.addbookIssueForm.resetForm();
    }, 1000);
    this.ngOnInit();
    console.log(formData);
  })
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
showselectedBookId:any
COPIES=""
showselectedBookAll:any
selectedBookDetails:any
selectedBookId: any;

// onBookSelectionChange(): void {
//   console.log("Selected Book ID:", this.selectedBookId);
//   if (this.selectedBookId) {
//     this.serviceData.stockBook(this.selectedBookId)
//       .subscribe((response: any) => {
//         console.log("Book Stock");
//         this.selectedBookId = response['Data'][0];


//         alert("Total copies : " + this.selectedBookId.COPIES +  '\n' + "Total Stock Quantity : " + this.selectedBookId.Stock_Quantity);
//        console.log(this.selectedBookId.Stock_Quantity);
        
//       }, (error) => {
//         console.error(error);
//       });
//   }
// }

onBookSelectionChange(): void {
  // Check if a book is selected
  if (this.selectedBookId) {
    // Call your API with the selected book ID
    this.serviceData.stockBook(this.selectedBookId)
      .subscribe((response: any) => {
        // Handle the API response as needed
        console.log("Book Stock");
        const bookDetails = response['Data'][0];
        
        // Assign the book details to a separate variable
        this.selectedBookDetails = bookDetails;

        // Log the book details for verification
        console.log("Selected Book Details:", this.selectedBookDetails);

      }, (error) => {
        // Handle any API errors
        console.error(error);
      });
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


}
