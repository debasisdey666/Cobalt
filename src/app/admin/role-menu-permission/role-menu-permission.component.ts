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
  roleMenuData: any;
  arrayForCheckbox: boolean[] = [];

  constructor(private roleService: RoleMenu, private servicedata:SidebarService) { }

  ngOnInit(): void {
    
    // var treeData = [
    //   {
    //     "id": "node1",
    //     "text": "Parent 1",
    //     "state": { "opened": true },
    //     "children": [
    //       {
    //         "id": "node2",
    //         "text": "Child 1",
    //         "state": { "opened": true },
    //         "children": [
    //           { "id": "node3", "text": "Grandchild 1" },
    //           { "id": "node4", "text": "Grandchild 2" }
    //         ]
    //       },
    //       { "id": "node5", "text": "Child 2" }
    //     ]
    //   },
    //   {
    //     "id": "node6",
    //     "text": "Parent 2",
    //     "state": { "opened": true },
    //     "children": [
    //       { "id": "node7", "text": "Child 3" }
    //     ]
    //   }
    // ];
  
    
    //   // Initialize jsTree with checkboxes
    //   $('#treeview').jstree({
    //     'core': {
    //       'data': treeData,
    //       'themes': {
    //         'icons': false
    //       }
    //     },
    //     'checkbox': {
    //       'keep_selected_style': false
    //     },
    //     'plugins': ['checkbox']
    //   });


    // API for roles
    this.roleService.getRole().subscribe((response: any) => {
      this.rolesData = response['ROLE'];
    })

    // API for role-permission
    let roleId = 4
    this.roleService.getRoleMenuPermission(roleId).subscribe((res: any) => {
      this.roleMenuData = res['MENU'];

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
                // if(subData.MENU_NAME == "USER"){
                //   this.checkFlag = true;
                // }
                // else{
                //   this.checkFlag = false;
                // }
                return { text: subData.MENU_NAME, value: indexOfSubmenu, checked: false }
              })
            }
          }
          if(value.MENU_NAME == 'COURSE'){
            return { text: value.MENU_NAME, value: 102, children:
              value.SubMenu.map((subData: any, indexOfSubmenu: any) => {
                return { text: subData.MENU_NAME, value: indexOfSubmenu, checked: false }
              })
            }
          }
          if(value.MENU_NAME == 'LIBRARY'){
            return { text: value.MENU_NAME, value: 103, children:
              value.SubMenu.map((subData: any, indexOfSubmenu: any) => {
                return { text: subData.MENU_NAME, value: indexOfSubmenu, checked: false }
              })
            }
          }
  
        //   // if(value.MENU_NAME != ''){
        //     // debugger;
            
        //   //   return { text: value.MENU_NAME, value: index, children:[
        //   //     {text: "ADD", value: '556', checked: false},
        //   //     {text: "EDIT", value: '665', checked: false},
        //   //     {text: "DELETE", value: '775', checked: false}
        //   //   ]}
        //   // }
          
          
          // return { text: value.MENU_NAME, value: index, checked: false };
        //  }
          // this.roleMenuData.forEach((data: any) => {
          //   if (value.MENU_NAME == data.MENU_NAME) {
          //     this.arrayForCheckbox = [];
          //     this.arrayForCheckbox.push(true);
          //   } else {
          //     this.arrayForCheckbox = [];
          //     this.arrayForCheckbox.push(false);
          //   }
          // });
          
          return { text: value.MENU_NAME, value: index };
        });
  
        console.log("result array:- ",resultArray);
        
        const childrenCategory = new TreeviewItem({
          text: 'Children', value: 1, collapsed: false, children: resultArray
        });
  
        this.items = [childrenCategory];
      })
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
