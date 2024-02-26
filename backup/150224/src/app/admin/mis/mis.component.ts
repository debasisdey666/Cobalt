import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {

  selectedMISReport: string = '0'; // Default value for the select
  fmdate: string = ''; // Property to bind to the From Date input
  todate: string = ''; // Property to bind to the To Date input
  toDateInvalid: boolean = false; // Flag to indicate if the To Date is invalid
  addSuccessmessage: boolean = false; // Flag to indicate if the To Date is invalid
  buttonDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  // Method to handle form submission
  searchMisInput() {
    // Implement your logic here
    console.log('Form submitted!');
  }

    // Method to validate date range
    // Method to validate date range
    // Method to validate date range
    validateDateRange() {
      if (this.fmdate && this.todate) {
        const fromDate = new Date(this.fmdate);
        const toDate = new Date(this.todate);
        this.toDateInvalid = toDate.getTime() < fromDate.getTime();
        if (this.toDateInvalid) {
          alert("To date must be greater than from date");
          this.buttonDisabled = true; // Disable the button
        } else {
          this.buttonDisabled = false; // Enable the button
        }
      }
    }

}
