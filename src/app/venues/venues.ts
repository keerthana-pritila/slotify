import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VenueDialog } from '../venue-dialog/venue-dialog';
import { CommonModule } from '@angular/common';
import { VenueCard } from '../venue-card/venue-card';

@Component({
  selector: 'app-venues',
  standalone: true,
  imports: [CommonModule,VenueCard],
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
    type: 'Outdoor',
  status: 'Active',
  image:'/images/football.jpg',
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
  type: 'Indoor',
  status: 'Active',
  image:'/images/tennis.jpeg',
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
  type: 'Indoor',
  status: 'Active',
  image:'/images/badminton.jpeg',
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
    type: 'Outdoor',
  status: 'Active',
  image:'/images/cricket.jpeg',
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
    type: 'Outdoor',
  status: 'Active',
  image:'/images/basketball.jpeg',
  locations: [
    {
      place: 'Madhapur',
      price: 400
    },
    {
      place: 'Attapur',
      price: 450
    },
    {
      place: 'Gachibowli',
      price: 600
    }
  ]
},
{
   id: 6,
  name: 'Volleyball Ground🏐',
    type: 'Outdoor',
  status: 'Active',
  image:'/images/volleyball.jpeg',
  locations: [
    {
      place: 'Madhapur',
      price: 400
    },
    {
      place: 'Gachibowli',
      price: 600
    },
    {
      place: 'Attapur',
      price: 450
    }
  ]
}
    // {
    //   id: 6,
    //   name: 'Volleyball Ground🏐',
    //   location: 'Madhapur',
    //   price: 300,
    //   status: 'Active'
    // }
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
