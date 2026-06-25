import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../api';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPassword } from '../forgot-password/forgot-password';
// import { OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
// export class Login implements OnInit {
export class Login{
  router = inject(Router);
  api = inject(Api);
  toastr = inject(ToastrService); //Inject Toastr
  dialog = inject(MatDialog);

  ngOnInit(): void {
    // Check if an admin is already logged in
    const admin = localStorage.getItem('adminLoggedIn');
    if (admin) {
      this.toastr.warning('Admin is already logged in', 'Access Denied');
      this.router.navigate(['/admin']);  // Redirect to admin dashboard
      return;
    }

    // Check if user is logged in
    const user = localStorage.getItem('loggedInUser'); //Since user exists, immediately redirect:
    if (user) {
      this.router.navigate(['/']); // If user data exists in localStorage, navigate to home
    }
  }

  isvalid: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)])
  });
  backToHome(): void {
    this.router.navigate(['/']);
  }

  myfunction(): void {
    this.isvalid = !this.isvalid;
    console.log('test')
  }
  loginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const loginData = this.loginForm.value;
    this.api.getUsers().subscribe(users => {
      let userFound = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == loginData.email && users[i].password == loginData.password) {

          // Add points field for old users
          if (users[i].points === undefined) {
            users[i].points = 0;
            this.api.updateUser(users[i].id, users[i]).subscribe();
          }

          //This saves the logged-in user in the browser
          localStorage.setItem("loggedInUser", JSON.stringify(users[i]));
          userFound = true;

          this.toastr.success('Logged in successfully', 'Success'); //Show Success Toast
          this.router.navigate(['/dashboard']);
          break;
        }
      }
      if (!userFound) {
        // alert("user not registered or invalid credentials");
        this.toastr.error('Invalid email or password', 'Login Failed');
      }
    });

  }
  forgotPassword(): void {
    this.dialog.open(ForgotPassword, {
      width: '450px',
      panelClass: 'forgot-password-dialog',
      //  added custom class when opening Forgot Password dialog bcz,
      // it targets outermost container wrapper of that component & Enables Global Styling
      data: { type: 'user' }
      //Pass data to the dialog:like whether its for admin or user
      //  because using same forgot-password component for both user and admin.
    });
  }

}
