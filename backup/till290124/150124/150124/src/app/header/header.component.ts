import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { ProfileService } from '../services/profile.service';
import { InstructorService } from '../services/instructor.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showStudentData:any;
  showStudent:any;
  showInstructor:any;
  showIns:any;

  // userName = environment.userName;

  constructor(    
    private serviceData:ProfileService,
    private serviceData2:InstructorService,
  ) { }

  userName: any;
  ROLE_ID: any;
  facultyNm:any;
  isInstructor: boolean = false;

  ngOnInit(): void {

    // this.serviceData.showStudentDetails().subscribe((data) => {
    //   this.showStudentData = data;
    //   this.showStudent =  this.showStudentData['Data'];
    //  console.log("this.showStudent");
    //  console.log(this.showStudent);     
    // })

    this.serviceData.showStudentDetails().subscribe((data) => {
      this.showStudentData = data;
      this.showStudent = this.showStudentData['Data'];
  
      // Assuming ID is a property in showStudent, replace 'ID' with the actual property name
      const ID = this.showStudent[0].ID; 
  
      console.log("this.showStudent");
      console.log(this.showStudent);
      console.log(ID);
  
      // Make sure ID is defined before setting it in localStorage
      if (ID !== undefined) {
        localStorage.setItem('studenId', ID.toString());
      }
    });

    this.serviceData2.showInstructor().subscribe((data) => {
      this.showInstructor = data;
      this.showIns =  this.showInstructor['Data'];
      this.facultyNm = this.showIns[0].NAME;
    })

    
    this.userName = getFromLocalStorage('username');
    this.ROLE_ID = getFromLocalStorage('ROLE_ID');
    this.ROLE_ID = getFromLocalStorage('ROLE_ID');

    

    $(document).ready(function(){  

      // ***********toggle menu button********
      $('.toggle-sidebar-btn').click(function(){
        $('body').toggleClass('toggle-sidebar')
       // $('#components-nav').addClass('show')
      });


        // ***********toggle menu button********
        // $('.subLink').click(function(){
        //   $(this).addClass('ooo')
        // });

    });


   
  }

  
  

  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem('Data');
    localStorage.removeItem('Data2');
    localStorage.removeItem('session');
    localStorage.clear();    

}
  
}


