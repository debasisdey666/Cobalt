import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { NavigationEnd,Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private servicedata:SidebarService, private router: Router) { }

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

isSubmenuActive(index: number): boolean {
  // Check if any sublink in the submenu is active
  return this.showmenu[index]?.SubMenu?.some((sub: any) => this.router.isActive(`/${sub.MENU_LINK}`, true));
}

toggleCollapse(index: number) {
  const element = document.getElementById(`components-nav-${index}`);
  if (element) {
    element.classList.toggle('show');
  }
}

}
