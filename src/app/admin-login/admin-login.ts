import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  router = inject(Router);
  toastr = inject(ToastrService);

  email: string = '';
  password: string = '';

  adminLogin(): void {
    // Checking admin credentials
    if (this.email === 'admin@slotify.com' && this.password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');  // Store admin login status
      this.toastr.success('Welcome Admin', 'Login Successful');  // Success toast
      this.router.navigate(['/admin']); // Navigate to admin page
  }
  else { 
      this.toastr.error( 'Invalid email or password', 'Login Failed');  // Error toast
    }
  }
}
