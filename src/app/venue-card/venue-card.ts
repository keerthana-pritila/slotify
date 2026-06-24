import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venue-card',
  imports: [CommonModule],
  templateUrl: './venue-card.html',
  styleUrl: './venue-card.scss',
})
export class VenueCard {
  @Input() venue:any;
  @Input() flipped = false;
  @Output() flip = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<any>();

  flipCard() {
    this.flip.emit(this.venue.id);
  }

  openDetails(event: Event) {
    event.stopPropagation();
    this.viewDetails.emit(this.venue);
  }
}
