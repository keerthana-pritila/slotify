import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HomeViewService } from '../home-view-service';
import { RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialog } from '../help-dialog/help-dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,MatDialogModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showhelpPopUp = false;

  constructor(public router: Router,
     public HomeViewServive: HomeViewService,
     private dialog: MatDialog) { }

     get isLoggedIn(): boolean {
  return !!localStorage.getItem('loggedInUser'); //! - NOT ,!! - Reverse of NOT 
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
  // closehelpPopUp() {
  //   this.showhelpPopUp = false;
  // }
}
