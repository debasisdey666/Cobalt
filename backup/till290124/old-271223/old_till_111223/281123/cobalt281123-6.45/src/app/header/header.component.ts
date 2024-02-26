import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { getFromLocalStorage } from '../../environments/local-storage-util';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // userName = environment.userName;

  constructor() { }

  userName: string | null = null;

  ngOnInit(): void {

    
    this.userName = getFromLocalStorage('userName');

    

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


