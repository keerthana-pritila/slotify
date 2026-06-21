import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VenueDialog } from '../venue-dialog/venue-dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-venues',
  imports: [CommonModule],
  templateUrl: './venues.html',
  styleUrl: './venues.scss',
})
export class Venues {
  dialog = inject(MatDialog);
  flippedCard: number | null = null; // stores currently flipped card

  venues = [
    {
      id: 1,
      name: 'Football Turf',
      location: 'Hyderabad',
      price: 500,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Tennis Court',
      location: 'Hyderabad',
      price: 400,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Badminton Arena',
      location: 'Hyderabad',
      price: 300,
      status: 'Inactive'
    }
  ];

  flipCard(id: number) {
    // Check if the clicked card is already flipped
    if (this.flippedCard === id) {
      // If the same card is clicked again,
      // close it by setting flippedCard to null
      this.flippedCard = null;
    }
    else {
      // If a different card is clicked,
      // store its id so that card gets flipped/opened
      this.flippedCard = id;
    }

  }

  openVenue(venue: any) {
    this.dialog.open(VenueDialog, {
      width: '450px',
      data: venue
    });
  }
}
