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
  name: 'Football Turf🏈',
  status: 'Active',
  locations: [
    {
      place: 'Madhapur',
      price: 500
    },
    {
      place: 'Gachibowli',
      price: 600
    },
    {
      place: 'Kondapur',
      price: 550
    }
  ]
},
    {
  id: 2,
  name: 'Tennis Court🎾',
  status: 'Active',
  locations: [
    {
      place: 'Madhapur',
      price: 400
    },
    {
      place: 'Attapur',
      price: 450
    }
  ]
},
 {
  id: 3,
  name: 'Badminton Court🏸',
  status: 'Active',
  locations: [
    {
      place: 'Madhapur',
      price: 400
    },
    {
      place: 'Attapur',
      price: 450
    }
  ]
},
{
  id: 4,
  name: 'Cricket Ground🏏',
  status: 'Active',
  locations: [
    {
      place: 'Madhapur',
      price: 400
    },
    {
      place: 'Attapur',
      price: 450
    }
  ]
},
{
  id: 5,
  name: 'Basketball Ground🏀',
  status: 'Active',
  locations: [
    {
      place: 'Madhapur',
      price: 400
    },
    {
      place: 'Attapur',
      price: 450
    }
  ]
},


    {
      id: 6,
      name: 'Volleyball Ground🏐',
      location: 'Madhapur',
      price: 300,
      status: 'Active'
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

  openVenue(venue:any){
  const dialogRef = this.dialog.open(
    VenueDialog,
    {
      width:'450px',
      data:venue
    }
  );

  dialogRef.afterClosed().subscribe(result => {
    if(result?.delete){
      this.venues =
        this.venues.filter(
          v => v.id !== result.id
        );
    }

  });

}
}
