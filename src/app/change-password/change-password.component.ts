import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ChangePasswordService } from '../services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  
  @ViewChild('changePassForm') changePassForm!: NgForm;

  constructor(
    private serviceData:ChangePasswordService
  ) { }

  isSubmit:boolean = false;
  loading:boolean = false;
  updateSuccessmessage:boolean = false;

  ngOnInit(): void {
  }

  changePassFormdata(data:any){
    this.loading = true;
    this.serviceData.chnagePass(data).subscribe((resp)=>{
      this.loading = false;
      this.updateSuccessmessage = true;

      setTimeout(() => {
        this.updateSuccessmessage = false;
        this.changePassForm.resetForm();
      }, 1000);

      console.log("change pass");
      console.log(resp);

    })
  }

}
