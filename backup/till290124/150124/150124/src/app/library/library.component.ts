import { Component, OnInit } from '@angular/core';
import { CountdownService } from '../services/countdown.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  countdownData: { days: number; hours: number; minutes: number; seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  constructor(private countdownService: CountdownService) {}

  ngOnInit(): void {
    // Update the countdown every 1 second
    setInterval(() => {
      this.countdownData = this.countdownService.calculateTimeRemaining();

      // If the countdown is over, display a message
      if (this.countdownData.days < 0) {
        this.countdownData = { days: 0, hours: 0, minutes: 0, seconds: 0 }; // or set a message property to display "EXPIRED"
      }
    }, 1000);
  }
}
