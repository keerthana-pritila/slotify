import { Component,inject } from '@angular/core';
import { Api } from '../api';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DemoMaterialpop } from '../demomaterialpop/demomaterialpop';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Weather } from '../weather';

@Component({
  selector: 'app-book-slot',
  imports: [FormsModule, RouterLink, FontAwesomeModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './book-slot.html',
  styleUrl: './book-slot.scss',
})
export class BookSlot {
  api = inject(Api);
  weatherService = inject(Weather);
  weatherMessage = '';
  isRaining = false;

  // User's current GPS coordinates
  userLat = 0;
  userLon = 0;

  // Distance between user and venue
  distanceKm = 0;

  closeIcon = faSquareXmark;
  currentStep: number = 1;
  selectedLocation: string = "";
  selectedLocationData: any = null; // selected sports location object

  selectedVenue: string = '';
  selectedVenueType: string = '';

  selectedDate: string = '';
  selectedTime: string = '';
  minDate: string = '';
  // calendar date prior to the specified minDate will be grayed out, disabled, and unclickable

  // RxJS streams for booking filters
  location$ = new BehaviorSubject<string>('');
  venue$ = new BehaviorSubject<string>('');
  date$ = new BehaviorSubject<string>('');
  time$ = new BehaviorSubject<string>('');


  paymentMethod: string = '';
  bookingAmount: number = 800;
  openQr: boolean = false;
  bookingCompleted: boolean = false; // Prevents reward points from being added multiple times

  venues = [
    {
      name: 'Badminton Court🏸',
      type: 'Indoor'
    },
    {
      name: 'Football Turf🏈',
      type: 'Outdoor'
    },
    {
      name: 'Cricket Ground🏏',
      type: 'Outdoor'
    },
    {
      name: 'Tennis Court🎾',
      type: 'Indoor'
    },
    {
      name: 'Basketball Ground🏀',
      type: 'Outdoor'
    },
    {
      name: 'Volleyball Ground🏐',
      type: 'Outdoor'
    }
  ];
  timeSlots = [
    '6AM-7AM',
    '7AM-8AM',
    '5PM-6PM',
    '6PM-7PM'
  ];
  locations = [
    {
      name: 'Madhapur',
      lat: 17.4483,
      lon: 78.3915
    },
    {
      name: 'Gachibowli',
      lat: 17.4401,
      lon: 78.3489
    },
    {
      name: 'Attapur',
      lat: 17.3660,
      lon: 78.4280
    },
    {
      name: 'Nagole',
      lat: 17.3714,
      lon: 78.5695
    }
  ];
  paymentUrl: string = 'No Payment';

  loadAvailableSlots(
    location: string,
    venue: string,
    date: string,
    time: string
  ) {
    console.log('Loading available slots for:', location, venue, date, time);
  }

  constructor(private dialog: MatDialog, private toastr: ToastrService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    //Get User Location for weather forecast
    // Request device GPS coordinates from the browser
    // This asks the user's web browser for permission to access their GPS location.
    navigator.geolocation.getCurrentPosition(position => {

      // Store current user GPS coordinates
      this.userLat = position.coords.latitude;
      this.userLon = position.coords.longitude;
      this.calculateDistance();

      // // Call the Weather API using coordinates
      // this.weatherService.getWeather(lat, lon).subscribe((data: any) => {

      //   //checks for rain and updates UI

      //   this.isRaining = (data.current.rain ?? 0) > 0;  // true if rain exists
      //   this.checkWeatherAdvice(); // update weather message

      // });
    });


    const location = localStorage.getItem('selectedLocation');

    if (location) {
      this.selectedLocation = location; // Store selected location name

      // Find the full location object
      this.selectedLocationData =
        this.locations.find(loc => loc.name === location);

      this.location$.next(location);//RXJS :Send Initial Location Value to stream
      this.loadLocationWeather();// Load weather for selected location
      this.calculateDistance();// Calculate distance
    }
    // Listen for changes in all filters
    combineLatest([
      this.location$,
      this.venue$,
      this.date$,
      this.time$
    ]).subscribe(
      ([location, venue, date, time]) => {
        console.log('Filters Changed:', location, venue, date, time);
        this.loadAvailableSlots(location, venue, date, time);
      });
  }

  cannotGoNext(): boolean {
    switch (this.currentStep) {
      case 1: return this.selectedVenue === '';
      case 2: return this.selectedDate === '';
      case 3: return this.selectedTime === '';
      case 4: return false;
      case 5: return this.paymentMethod === '';
      default: return false;
    }
  }
  nextStep(): void {
    if (this.cannotGoNext()) {  // Stop moving to next step if required fields are empty
      return;
    }

    // When payment is completed (Step 5),
    // add reward points only once
    //!this.bookingCompleted --means --Booking is NOT completed yet
    if (this.currentStep === 5 && !this.bookingCompleted) {
      this.addRewardPoints(); //calling it  after successful payment, Gives +10 reward points to user

      this.bookingCompleted = true;  // Mark booking as completed so points are not added again

      this.toastr.success('Payment completed successfully. +10 reward points added!', 'Payment Success');
      //Show toast when payment is successful
    }
    if (this.currentStep < 6) {
      this.currentStep++;
    }
  }
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  upiPayment(): void {
    this.openQr = true;
    // upi://pay?pa=YOUR_UPI_ID&pn=YOUR_NAME&am=AMOUNT&tn=TRANSACTION_NOTE&cu=INR
    // this.paymentUrl = `upi://pay?pa=vijaykandadai@ybl&pn=Vijay&am=${this.bookingAmount}&cu=INR`
    this.paymentUrl = `upi://pay?pa=7780163335@yescred@ybl&pn=Keerthana&am=${this.bookingAmount}&cu=INR`

    this.dialog.open(DemoMaterialpop, {
      width: '400px',
      data: {
        paymentUrl: this.paymentUrl,
        amount: this.bookingAmount
      }
    });
  }

  selectVenue(venue: any) {
    // Save Venue Details
    this.selectedVenue = venue.name;
    this.selectedVenueType = venue.type;

    this.venue$.next(venue.name); //means Venue changed,Notify everyone(Update venue stream)
    this.checkWeatherAdvice();

    console.log("Venue:", venue.name);
console.log("Type:", venue.type);
console.log("Rain:", this.isRaining);
  }

  onDateChange(date: string) {
    this.date$.next(date); // Update date stream
  }

  selectTime(slot: string) {
    this.selectedTime = slot;
    this.time$.next(slot); // Time changed
  }

  // Get weather using selected sports location
  loadLocationWeather() {
    if (!this.selectedLocationData) {
      return;
    }

    this.weatherService.getWeather(this.selectedLocationData.lat, this.selectedLocationData.lon)
      .subscribe((data: any) => {
         console.log(data);
         
        this.isRaining = (data.current.rain ?? 0) > 0; // True if rain exists
        this.checkWeatherAdvice();   // Update weather message
      });
  }
  //Calculate distance between user and venue
  calculateDistance() {

    // Stop if location is not available
    if (!this.selectedLocationData) {
      return;
    }

    // Difference between coordinates
    const latDiff =
      this.userLat - this.selectedLocationData.lat;

    const lonDiff =
      this.userLon - this.selectedLocationData.lon;

    // Simple distance formula
    this.distanceKm =
      Math.sqrt(
        latDiff * latDiff +
        lonDiff * lonDiff
      ) * 111;

    //Math.sqrt(...)finds the straight-line distance.
    //* 111 converts latitude difference approximately into kilometers.

    this.distanceKm = Number(this.distanceKm.toFixed(1)); // Round to 1 decimal
  }

  checkWeatherAdvice() {
    if (this.selectedVenueType === 'Outdoor' && this.isRaining) {
      this.weatherMessage = `🌧️ Rain expected in ${this.selectedLocation}. Outdoor games may be affected`;
    } else if (this.selectedVenueType === 'Indoor' && this.isRaining) {
      this.weatherMessage = `🏸 Rain expected in ${this.selectedLocation},
but indoor games are safe.`;

    } else {
      this.weatherMessage = `☀️ Weather looks good in ${this.selectedLocation} for your booking.`;
    }
  }

  addRewardPoints(): void {
    const userData = localStorage.getItem('loggedInUser');   // Get logged-in user from browser storage

    if (!userData) {   // Stop if no user is logged in
      return;
    }
    const user = JSON.parse(userData);  // Convert JSON string into object

    // Add 10 points to existing points
    // If points do not exist, start from 0
    user.points = (user.points || 0) + 10;

    // Update user in JSON Server database
    this.api.updateUser(user.id, user).subscribe({
      next: () => {
        console.log('Reward points updated');
      }
    });
    localStorage.setItem('loggedInUser', JSON.stringify(user));   // Update localStorage so UI refreshes immediately
  }

}