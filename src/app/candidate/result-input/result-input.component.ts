import { Component, OnInit } from '@angular/core';
import { ResultInputService } from 'src/app/services/result-input.service';

@Component({
  selector: 'app-result-input',
  templateUrl: './result-input.component.html',
  styleUrls: ['./result-input.component.css']
})
export class ResultInputComponent implements OnInit {

  showRsltInp:any;
  showRsltInpAll:any;

  constructor(
    private serviceData:ResultInputService
  ) { }

  ngOnInit(): void {
    this.serviceData.showResultInput().subscribe((data)=>{
      this.showRsltInp = data;
      this.showRsltInpAll = this.showRsltInp['Data'];
      console.log("this.showRsltInpAll");      
      console.log("this.showRsltInp");   
      console.log(this.showRsltInpAll);   
    })
  }
}
