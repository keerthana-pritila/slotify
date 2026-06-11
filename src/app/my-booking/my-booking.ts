import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-booking',
  imports: [RouterLink],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.scss',
})
export class MyBooking {
  //: any: This is a TypeScript data type.
  //  It tells the compiler to turn off type-checking for this variable.
  //  It can hold text, numbers, objects, arrays, or null.
  selectedBooking : any = null;

  //Dummy booking data
  //  bookings: any[] = []; //to Test ,if no bookings-empty state will display 
  bookings = [
    {
      sport: 'Football Turf',
      image:"/images/football.jpg",
      location: 'Gachibowli',
      date: '15 Sep 2025',
      time: '7:00 PM - 8:00 PM'
    },
    {
      sport: 'Cricket Turf',
      image:"/images/cricket.jpeg",
      location: 'Madhapur',
      date: '18 Sep 2025',
      time: '6:00 PM - 7:00 PM'
    }
  ];
}
