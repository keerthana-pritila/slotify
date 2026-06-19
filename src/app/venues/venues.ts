import { Component ,inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VenueDialog } from '../venue-dialog/venue-dialog';


@Component({
  selector: 'app-venues',
  imports: [],
  templateUrl: './venues.html',
  styleUrl: './venues.scss',
})
export class Venues {
  dialog = inject(MatDialog);
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

  openVenue(venue:any){

    this.dialog.open(VenueDialog,{
      width:'450px',
      data:venue
    });

  }
}
