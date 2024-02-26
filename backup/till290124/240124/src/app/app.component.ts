import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../assets/css/style.css','../assets/css/bootstrap.min.css']
})
export class AppComponent {
  title = 'my-app';
  constructor(private router: Router) {
    // Subscribe to router events to update navigation visibility
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Optionally, you can check the current route here and update a variable
      // that is used in the *ngIf condition in the template.
    });
  }
  shouldShowNavigation(): boolean {
    // Customize this logic based on your requirements
    return !this.router.url.includes('login'); // Hide navigation on the login page
  }
}
