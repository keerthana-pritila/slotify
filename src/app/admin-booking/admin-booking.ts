import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-booking',
  imports: [CommonModule,MatTableModule],
  templateUrl: './admin-booking.html',
  styleUrl: './admin-booking.scss',
})
export class AdminBooking {
    displayedColumns = [
    'user',
    'venue',
    'date',
    'time',
    'status'
  ];
   dataSource = new MatTableDataSource<any>();
  bookings = [

    {
      user: 'keerthana',
      venue: 'Football Turf',
      date: '20 Jun 2026',
      time: '6 PM - 7 PM',
      status: 'Confirmed'
    },

    {
      user: 'anushkaa',
      venue: 'Tennis Court',
      date: '21 Jun 2026',
      time: '5 PM - 6 PM',
      status: 'Cancelled'
    },

    {
      user: 'Nithin',
      venue: 'Badminton Arena',
      date: '22 Jun 2026',
      time: '7 PM - 8 PM',
      status: 'Confirmed'
    }

  ];

  ngOnInit() {
    this.dataSource.data = this.bookings;
  }
}
