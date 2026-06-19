import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialog } from '../logout-dialog/logout-dialog';
import { Api } from '../api';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  router = inject(Router);
  api = inject(Api);
  dialog = inject(MatDialog);
  cdr = inject(ChangeDetectorRef); 

  totalUsers = 0; //real
  totalVenues = 6;
  totalBookings = 0;
  //  totalUsers = 999;

  constructor() {
    console.log('Admin component loaded');
  }
  ngOnInit(): void {
    console.log('Admin ngOnInit fired');
    // Check if admin is logged in
    const admin = localStorage.getItem('adminLoggedIn');
    if (!admin) {
      this.router.navigate(['/admin-login']);
    }

    //Load users count
    this.api.getUsers().subscribe({
      next: (users) => {
        console.log(users);
        this.totalUsers = users.length;
        this.cdr.detectChanges(); 
        //this.cdr is an object that lets you manually tell Angular to refresh the UI.so profile updates .
        console.log('Updated count:', this.totalUsers);
      }
    });
  }

  adminLogout(): void {
    const dialogRef = this.dialog.open(LogoutDialog, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('adminLoggedIn');
        this.router.navigate(['/admin-login']);
      }
    });
  }
}
