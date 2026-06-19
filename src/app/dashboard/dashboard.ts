import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog } from '../profile-dialog/profile-dialog';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
//import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  router = inject(Router);
  dialog = inject(MatDialog);
  cdr = inject(ChangeDetectorRef);
  toastr = inject(ToastrService);

  //for displaying welcome + username
  username: string = "";
  // rewardPoints: number = 0;
  points: number = 0;

  selectedLocation: string = "Select Location"; //for location dropdown 
  locations = [
    "Madhapur",
    "Gachibowli",
    "Attapur",
    "Nagole"
  ];

  ngOnInit(): void {
    console.log(localStorage.getItem('loggedInUser'));
    const userData = localStorage.getItem('loggedInUser');
    if (!userData) {
      this.router.navigate(['/login']); //whe user not loggedin then when clicks on back then goes to login
      return;
    }

    const user = JSON.parse(userData);
    this.username = user.name;
    //  this.rewardPoints = user.points ?? 0;
    this.points = user.points || 0;

    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      this.selectedLocation = savedLocation;
    }
  }
  saveLocation(): void {
    if (this.selectedLocation !== 'Select Location') { //if default select location,then dont save 
      localStorage.setItem('selectedLocation', this.selectedLocation);
    }
  }
  goToBookSlot(): void {
    if (this.selectedLocation === 'Select Location') {
      // this.toastr.error('Please select a location before booking a slot.', 'Location Required');
      this.toastr.warning('Please select location first', 'Location Required');
      return;
    }
    this.router.navigate(['/bookSlot']);
  }
  // logout(): void {
  //   localStorage.removeItem('loggedInUser');
  //   this.router.navigate(["/"]);
  // }
  myProfile(): void {
    const dialogRef = this.dialog.open(ProfileDialog, { width: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      //   console.log('Dialog result:', result);
      if (result) {

        this.username = result.name;
        this.cdr.detectChanges(); //this.cdr is an object that lets you manually tell Angular to refresh the UI.so profile updates .
        //console.log('Username updated to:', this.username);
      }
    });
  }

}

