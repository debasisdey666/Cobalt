// countdown.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countDownDate: number;

  constructor() {
    // Set the date we're counting down to (replace with your desired launch date)
    this.countDownDate = new Date('mar 10, 2024 00:00:00').getTime();
  }

  calculateTimeRemaining(): { days: number; hours: number; minutes: number; seconds: number } {
    const now = new Date().getTime();
    const distance = this.countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }
}
