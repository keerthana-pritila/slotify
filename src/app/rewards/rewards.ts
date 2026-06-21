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
  membership: string = 'Bronze 🥉';
  nextLevel: string = '';

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');

    if (userData) {
      const user = JSON.parse(userData);
      this.points = user.points || 0;

      // Set membership according to points
      if (this.points >= 100) {
        this.membership = 'Gold 🥇';
        this.nextLevel = 'Highest Membership Achieved 🎉';
        this.nextLevel = 'You have achieved the Gold membership level!🎉';
      }
      else if (this.points >= 50) {
        this.membership = 'Silver 🥈';
        this.nextLevel = `Earn ${100 - this.points} more points for Gold 🥇`;
      }
      else {
        this.membership = 'Bronze 🥉';
        this.nextLevel = `Earn ${50 - this.points} more points for Silver 🥈`;
      }
    }
  }
}
