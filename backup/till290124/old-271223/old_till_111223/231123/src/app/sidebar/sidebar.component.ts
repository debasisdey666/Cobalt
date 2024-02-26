import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private servicedata:SidebarService, ) { }

  showmenuAll:any;
  showmenu:any;

  
  
  ngOnInit(): void {
    this.servicedata.showmenu().subscribe((data)=>{
      this.showmenuAll=data;
      this.showmenu = this.showmenuAll['MENU'];
      console.log("this.showmenu");
      console.log(this.showmenu);
    })
  }
  toggleCollapse(index: number) {
  const element = document.getElementById(`components-nav-${index}`);
  if (element) {
    element.classList.toggle('show');
  }
}

}
