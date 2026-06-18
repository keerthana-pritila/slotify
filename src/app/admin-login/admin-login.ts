import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin implements OnInit {
  router = inject(Router);
  toastr = inject(ToastrService);
  dialog = inject(MatDialog);

  email: string = '';
  password: string = '';

  ngOnInit(): void {
    // Check if user is logged in
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.toastr.warning('Please logout from user account first', 'Access Denied');
      this.router.navigate(['/dashboard']); // Redirect user to dashboard
      return;
    }

    // Check if admin is logged in
    const admin = localStorage.getItem('adminLoggedIn');
    if (admin) {
      this.router.navigate(['/admin']); // Redirect to admin dashboard
    }
  }

  adminLogin(): void {
    //when admin password is resting,then here it goes either admin123 or new password from adminPassword
    const adminPassword = localStorage.getItem('adminPassword') || 'admin123';

    // Checking admin credentials
    if (this.email === 'admin@slotify.com' && this.password === adminPassword) {
      
      localStorage.setItem('adminLoggedIn', 'true');  // Store admin login status
      this.toastr.success('Welcome Admin', 'Login Successful');  // Success toast
      this.router.navigate(['/admin'], { replaceUrl: true }); // Navigate to admin page
      //{ replaceUrl: true } replaces the current history entry so the user cannot click "Back" to return here
    }
    else {
      this.toastr.error('Invalid email or password', 'Login Failed');  // Error toast
    }
  }
  forgotPassword(): void {
    this.dialog.open(ForgotPassword, {
      width: '450px',
      panelClass: 'forgot-password-dialog',
      data: { type: 'admin' }
      //Pass data to the dialog:like whether its for admin or user
      //  because using same forgot-password component for both user and admin.
    });
  }
}
