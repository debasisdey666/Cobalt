import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoleService } from '../../services/role.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('closeButton2') closeButton2!: ElementRef;
  @ViewChild('closeButton3') closeButton3!: ElementRef;
  @ViewChild('AddroleForm') AddroleForm!: NgForm;
  @ViewChild('EditroleForm') EditroleForm!: NgForm;

  showroleall:any;
  showRole:any;
  isSubmit:boolean = false;
  addSuccessmessage:boolean = false;
  errormessage:boolean = false;
  updateSuccessmessage:boolean = false;
  loading:boolean = false;

  constructor(
    private serviceData : RoleService
  ) { }

  ngOnInit(): void {
    this.serviceData.showRole().subscribe((data)=>{
      console.log("resp ROLE");
      this.showroleall = data;
      this.showRole = this.showroleall['Data'];
      console.log(this.showRole);
    });
  }

    // Pagination
  
    pageSize =6;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }

    // Add Role

    AddroleFormdata(data:any){
      this.loading = true;
      this.serviceData.addRole(data).subscribe((resp)=>{
        this.addSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.addSuccessmessage = false;
          this.closeButton.nativeElement.click();
          this.AddroleForm.resetForm();
        }, 1000);
        this.ngOnInit();       
      })
    }
    
    // Edit Role

    roleUpdate = {
      "ROLE_ID":0,
      "ROLE_Name":"",
      "DESCRIPTION":"",
      "status":true
    }

    editBtn(showRL:any,event:Event){
      this.roleUpdate = JSON.parse(JSON.stringify(showRL));
      console.log(this.roleUpdate.ROLE_ID);
      console.log(this.roleUpdate.ROLE_Name);
      console.log(this.roleUpdate.DESCRIPTION);      
    }

    EditroleFormdata(data:any){
      this.loading = true;
      this.serviceData.editRole(data).subscribe((resp)=>{
        this.updateSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton2.nativeElement.click();
          this.EditroleForm.resetForm();
        }, 1000);
        this.ngOnInit();  
      })
    }


    actvinactv(showRL:any,event:Event){
      this.roleUpdate= showRL;
      console.log(showRL.ROLE_ID);
    }

    StatusroleFormdata(){
      debugger
      this.loading = true;
      this.serviceData.statusRole(this.roleUpdate).subscribe((resp)=>{
        this.updateSuccessmessage = true;
        this.loading = false;
        setTimeout(() => {
          this.updateSuccessmessage = false;
          this.closeButton3.nativeElement.click();
          this.EditroleForm.resetForm();
        }, 1000);
        this.ngOnInit(); 
      })
    }


}
