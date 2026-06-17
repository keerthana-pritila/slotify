import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPassword } from '../forgot-password/forgot-password';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  router = inject(Router);
  toastr = inject(ToastrService);
  dialog = inject(MatDialog);

  email: string = '';
  password: string = '';

  adminLogin(): void {
    //when admin password is resting,then here it goes either admin123 or new password from adminPassword
    const adminPassword = localStorage.getItem('adminPassword') || 'admin123';

    // Checking admin credentials
    if (this.email === 'admin@slotify.com' && this.password === adminPassword) {
      localStorage.setItem('adminLoggedIn', 'true');  // Store admin login status
      this.toastr.success('Welcome Admin', 'Login Successful');  // Success toast
      this.router.navigate(['/admin']); // Navigate to admin page
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
