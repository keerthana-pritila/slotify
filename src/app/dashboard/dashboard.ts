import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog } from '../profile-dialog/profile-dialog';
import { ChangeDetectorRef} from '@angular/core';

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

  //for displaying welcome + username
  username: string = "";
  selectedLocation: string = "Select Location"; //for location dropdown 
  locations = [
    "Madhapur",
    "Gachibowli",
    "Attapur",
    "Nagole"
  ];
  // constructor() { //loading current user data
  //   const userData = localStorage.getItem('loggedInUser');
  //   if (userData) {
  //     const user = JSON.parse(userData);
  //     this.profileForm.controls.name.setValue(user.name);
  //     this.profileForm.controls.phone.setValue(user.phone);
  //     this.profileForm.controls.password.setValue(user.password);
  //   }
  // }
  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.name;
    }
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
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(["/"]);
  }
  myProfile(): void {
    const dialogRef = this.dialog.open(ProfileDialog, { width: '450px' });
    dialogRef.afterClosed().subscribe( result => {
     //   console.log('Dialog result:', result);
       if (result) {
     
      this.username = result.name;
           this.cdr.detectChanges(); //this.cdr is an object that lets you manually tell Angular to refresh the UI.so profile updates .
       //console.log('Username updated to:', this.username);
       }
    });
  }  
}

