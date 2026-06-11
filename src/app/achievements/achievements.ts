import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-achievements',
  imports: [],
  templateUrl: './achievements.html',
  styleUrl: './achievements.scss',
})
export class Achievements implements OnInit{
  currentSlide = 0;
  achievements = [
    {
      image: '/achievements/slotify.jpeg',
      title: 'Excellence Award',
      description: 'Outstanding sportsmanship and performance.',
      year: '2025',
    },
    {
      image: '/achievements/trophy1.jpeg',
      title: 'Best Team Award',
      description: 'Recognized for exceptional teamwork.',
      year: '2025',
    },
    {
      image: '/achievements/trophy2.jpeg',
      title: 'Highest Winning Percentage',
      description: 'Achieved a 92% win rate.',
      year: '2024',
    },
    {
      image: '/achievements/trophy3.jpg',
      title: 'Best Team Award',
      description: 'Awarded for consistent team excellence.',
      year: '2026',
    }
  ];
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.achievements.length;
    //increment a number and  loop back to zero when it reaches the end of an array.
    //% (Modulo Operator): Divides the incremented number by the total number of items and returns only the remainder.
  }
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.achievements.length) % this.achievements.length;
  }
  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
}
