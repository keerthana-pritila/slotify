import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  selectedSport: string = "";
  sports: string[] = ["cricket", "Football", "Badminton", "Tennis", "Basketball","Volleyball"];
  todayDate = new Date().toLocaleDateString('en-GB');
  
}
