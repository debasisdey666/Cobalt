import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import { ProfileService } from '../services/profile.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showStudentData:any;
  showStudent:any;

  // userName = environment.userName;

  constructor(    
    private serviceData:ProfileService
  ) { }

  userName: any;
  ROLE_ID: any;

  ngOnInit(): void {

    this.serviceData.showStudentDetails().subscribe((data) => {
      this.showStudentData = data;
      this.showStudent =  this.showStudentData['Data'];
     console.log(this.showStudent);
    })

    
    this.userName = getFromLocalStorage('userId');
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


