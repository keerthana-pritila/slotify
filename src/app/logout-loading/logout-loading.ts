import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-logout-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './logout-loading.html',
  styleUrl: './logout-loading.scss',
})
export class LogoutLoading {
  constructor(private router: Router) { }
  ngOnInit(): void {
    setTimeout(() => {
       localStorage.removeItem('loggedInUser');
    localStorage.removeItem('selectedLocation');
      this.router.navigate(['/login']);
    }, 2000);

  }
}
