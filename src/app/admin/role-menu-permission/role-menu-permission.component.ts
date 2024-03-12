import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig, DownlineTreeviewItem } from 'ngx-treeview';
import { RoleMenu } from 'src/app/services/rolemenu.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-role-menu-permission',
  templateUrl: './role-menu-permission.component.html',
  styleUrls: ['./role-menu-permission.component.css']
})
export class RoleMenuPermissionComponent implements OnInit {

  dropdownEnabled = true;
  items!: TreeviewItem[];
  values!: number[];
  checkFlag: boolean = false;

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 9000
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  showmenuAll: any;
  showmenu: any;
  rolesData: any;
  rows: any;

  constructor(private roleService: RoleMenu, private servicedata:SidebarService) { }

  ngOnInit(): void {
    this.servicedata.showmenu().subscribe((data)=>{
      this.showmenuAll=data;
      this.showmenu = this.showmenuAll['MENU'];
      console.log("this.showmenu from role");
      console.log(this.showmenu);

      let resultArray = this.showmenu.map((value: any, index: any) => {
        
        if(value.MENU_NAME == 'ACCESS CONTROL'){
          return { text: value.MENU_NAME, value: 101, children: 
            // {text: 'USER', value: 123},
            // {text: "ROLE", value: 456},
            // {text: 'ROLE PERMISSION', value: 789}
            value.SubMenu.map((subData: any, indexOfSubmenu: any) => {
              if(subData.MENU_NAME == "USER"){
                this.checkFlag = true;
              }
              else{
                this.checkFlag = false;
              }
              return { text: subData.MENU_NAME, value: indexOfSubmenu, checked: this.checkFlag }
            })
          }
        }
        if(value.MENU_NAME == 'COURSE'){
          return { text: value.MENU_NAME, value: 102, children:
            value.SubMenu.map((subData: any, indexOfSubmenu: any) => {
              return { text: subData.MENU_NAME, value: indexOfSubmenu }
            })
          }
        }
        if(value.MENU_NAME == 'LIBRARY'){
          return { text: value.MENU_NAME, value: 103, children:
            value.SubMenu.map((subData: any, indexOfSubmenu: any) => {
              return { text: subData.MENU_NAME, value: indexOfSubmenu }
            })
          }
        }

        if(value.MENU_NAME != ''){
          return { text: value.MENU_NAME, value: index, children:[
            {text: "ADD", value: '556'},
            {text: "EDIT", value: '665'},
            {text: "DELETE", value: '775'}
          ]}
        }

        return { text: value.MENU_NAME, value: index };
        
      });

      console.log("result array:- ",resultArray);
      
      const childrenCategory = new TreeviewItem({
        text: 'Children', value: 1, collapsed: false, children: resultArray
      });

      this.items = [childrenCategory];
    })

    // API for roles
    this.roleService.getRole().subscribe((response: any) => {
      this.rolesData = response['ROLE'];
    })

  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }

  // onSelectedChange($event: any){
  //   console.log($event.MENU_NAME)
  // }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]): void {
    // debugger
    // this.rows = [];
    // downlineItems.forEach(downlineItem => {
    //   const item = downlineItem.item;
    //   // const value = item.value;
    //   const texts = [item.text];
      
    //   console.log("text is:- "+texts);
    // });
  }
}
