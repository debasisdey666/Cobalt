import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from '../../services/role.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('userActiveForm') userActiveForm!: NgForm;
  @ViewChild('userEditForm') userEditForm!: NgForm;
  @ViewChild('userAddForm') userAddForm!: NgForm;

  showuser:any;
  showuserAll:any;
  showroleall:any;
  showRole:any;
  isSubmit:boolean = false;
  errormessage:boolean = false;
  addSuccessmessage:boolean = false;
  updateSuccessmessage:boolean = false;
  loading:boolean = false;

  constructor(
    private serviceData : UserService,
    private serviceData2 : RoleService,
  ) { }

  ngOnInit(): void {
    this.serviceData.showUser().subscribe((data)=>{
      this.showuserAll = data;
      this.showuser = this.showuserAll['Data'];
      console.log("this.showuser");
      console.log(this.showuser);
    })
    this.serviceData2.showRole().subscribe((data)=>{
      console.log("resp ROLE");
      this.showroleall = data;
      this.showRole = this.showroleall['Data'];
      console.log("this.showRole");
      console.log(this.showRole);
    });
  }

    // Pagination
  
    pageSize =10;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }


     // add

     userAddFormdata(data:any){
      this.loading = true; 
      this.serviceData.addUser(data).subscribe((resp: any)=>{
        console.log(resp);      
        this.loading = false;  
        this.addSuccessmessage = true;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton.nativeElement.click();
          this.userAddForm.resetForm();
        }, 1000);
        this.ngOnInit();
      })
     }


    // edit

    userUpdate = {
      "USER_ID":0,
      "USER_NAME":"",
      "PHONE":"",
      "EMAIL":"",
      "PASSWORD":"",
      "ROLE_ID":0,
      "STATUS":""
  }

    editBtn(showUsr:any,event:Event){
      this.userUpdate= JSON.parse(JSON.stringify(showUsr));
    }

    userEditFormdata(data:any){
      this.loading = true;  
      this.serviceData.editUser(data).subscribe((resp:any)=>{
        console.log(resp);      
        this.loading = false;  
        this.updateSuccessmessage = true;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton2.nativeElement.click();
          this.userEditForm.resetForm();
        }, 1000);
        this.ngOnInit();
      })
    }


    // active / Inactive

    actvinactv(showUsr:any,event:Event){
      this.userUpdate= showUsr;
      console.log(showUsr.ID);
    }

    userActiveFormData(){
      this.loading = true;  
      this.serviceData.activeInactiveUser(this.userUpdate).subscribe((resp)=>{
        console.log(resp);      
        this.loading = false;  
        this.updateSuccessmessage = true;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton3.nativeElement.click();
        }, 1000);
        this.ngOnInit();
      })
    }

}
