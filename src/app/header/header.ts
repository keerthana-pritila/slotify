import { Component, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HomeViewService } from '../home-view-service';
import { RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileDialog } from '../profile-dialog/profile-dialog';
import { LogoutDialog } from '../logout-dialog/logout-dialog';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatDialogModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isProfileMenuOpen = false;
  showhelpPopUp = false;
  // username: string = ""; //to display in header ,after login
   loggedInUsername: string = '';

  constructor(public router: Router,
    public HomeViewServive: HomeViewService,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      const userData = localStorage.getItem('loggedInUser');
      if (userData) {
        const user = JSON.parse(userData);
        this.loggedInUsername = user.name;
      }
    }
    toggleProfileMenu(): void {
  this.isProfileMenuOpen = !this.isProfileMenuOpen;
}
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser'); //! - NOT ,!! - Reverse of NOT 
  }
  // get loggedInUsername(): string {
  //   const userData = localStorage.getItem('loggedInUser');
  //   if (userData) {
  //     return JSON.parse(userData).name;
  //   }
  //   return "";
  // }
 

  get selectedLocation(): string { /* Gets the stored location name */
  return localStorage.getItem('selectedLocation') || 'No Location'; 
  // Get saved item from browser storage; if not found, return 'No Location'
}

  showAboutImages() {
    this.HomeViewServive.showAbout = true;
    this.router.navigate(['/']);
  }
  goHome() {
    this.HomeViewServive.showAbout = false;
    this.router.navigate(['/']);
  }
  openhelpPopUp() {
    // this.showhelpPopUp = true;
    this.dialog.open(HelpDialog, {
      width: '400px'
    });
  }
  openProfile(): void {
     console.log('openProfile called');
  this.dialog.open(ProfileDialog, { width: '450px' });
  }
  // logout(): void {
  //   localStorage.removeItem('loggedInUser');
  //   localStorage.removeItem('selectedLocation');
  //   this.router.navigate(['/']);
  // }

  confirmLogout(): void {
const dialogRef = this.dialog.open(
    LogoutDialog,
    { width: '350px'}
  );
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('selectedLocation');
      this.router.navigate(['/logoutLoading'], { replaceUrl: true });
    }
  });
}
}
