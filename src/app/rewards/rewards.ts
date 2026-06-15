import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-rewards',
  imports: [RouterLink],
  templateUrl: './rewards.html',
  styleUrl: './rewards.scss',
})
export class Rewards {
  points: number = 0;
  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');

    if (userData) {
      const user = JSON.parse(userData);
      this.points = user.points || 0;
    }
  }
}
