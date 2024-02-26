import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public pieChartLabels = ['Label 1', 'Label 2', 'Label 3'];
  public pieChartData = [300, 500, 200];
  public pieChartType = 'pie';

   // Chart options
   public chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit(): void {
  }

}
