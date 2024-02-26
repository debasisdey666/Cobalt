import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ChapterService } from 'src/app/services/chapter.service';
import { PaperService } from 'src/app/services/paper.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  resetFormValue(myForm: NgForm){
    myForm.resetForm()
  }

  constructor(
    private serviceData:ChapterService,
    private serviceData2:PaperService,
    ) { }

    showChapter:any;
    showCptr:any;
    showPaper:any;
    showpr:any;
    isSubmit=false;  
    addSuccessmessage:boolean=false;
    updateSuccessmessage:boolean=false;

    ngOnInit(): void {
      this.serviceData.showChapter().subscribe((data) => {
        this.showChapter = data;
        this.showCptr =  this.showChapter['Data'];
        console.log(this.showCptr);
      })

      this.serviceData2.showPaperTrue().subscribe((data) => {
        this.showPaper = data;
        this.showpr =  this.showPaper['Data'];
      })

    }

    
   // Pagination
  
   pageSize =6;
   items = [];
   pageOfItems: Array<any> | undefined;
 
   onChangePage(pageOfItems: Array<any>) {
     this.pageOfItems = pageOfItems;
   }


   // Add Data
   getChapterFormdata(data:any){
    this.isSubmit=true;
    this.serviceData.addChapter(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);

      console.log(data);
    })  
  }


   // edit Data

  chapterUpdate = {
    "ID": 0,
    "CHAPTER_NAME": "",
    "PAPER_ID": 1,
    "STATUS": true,
    "ADDEDBY": "",
    "UPDATEDBY": "",
  }

  editBtn(showCpt:any,event:Event){
    this.chapterUpdate= JSON.parse(JSON.stringify(showCpt));
    console.log(showCpt.ID)
  }


  chapterFormeditdata(data:any){
    this.isSubmit=true;
    this.serviceData.editChapter(data).subscribe((result)=>{
      this.addSuccessmessage=true;
      this.ngOnInit();
      setTimeout(function() {
        window.location.reload();
    }, 500);
      console.log(data);
    })  
  }



   // active / deactive Data

  actvinactv(showCpt:any,event:Event){
    this.chapterUpdate= showCpt;
    console.log(showCpt.ID);
  }

  chapterStatusFormData() {

    this.serviceData.statusChapter(this.chapterUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.updateSuccessmessage = true;
        setTimeout(function () {
          window.location.reload();
        }, 500);
      },
      (err) => {
        console.log(err);
        this.updateSuccessmessage = false;
      }
    )


  }

}
