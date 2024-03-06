import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showuser:any;
  showuserAll:any;
  isSubmit:boolean = false;
  errormessage:boolean = false;
  addSuccessmessage:boolean = false;

  constructor(
    private serviceData : UserService
  ) { }

  ngOnInit(): void {
    debugger
    this.serviceData.showUser().subscribe((data)=>{
      this.showuserAll = data;
      this.showuser = this.showuserAll['Data'];
      console.log("this.showuser");
      console.log(this.showuser);
    })
  }

    // Pagination
  
    pageSize =10;
    items = [];
    pageOfItems: Array<any> | undefined;
  
    onChangePage(pageOfItems: Array<any>) {
      this.pageOfItems = pageOfItems;
    }


     // edit

     userAddFormdata(data:any){
      this.serviceData.addUser(data).subscribe((resp: any)=>{
        console.log(resp);
      })
     }


    // edit

    editBtn(showUsr:any,event:Event){

    }


    // active / Inactive

    actvinactv(showUsr:any,event:Event){

    }

}
