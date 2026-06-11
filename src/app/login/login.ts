import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../api';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPassword } from '../forgot-password/forgot-password';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  router = inject(Router);
  api = inject(Api);
  toastr = inject(ToastrService); //Inject Toastr
  dialog = inject(MatDialog);

  isvalid: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(6)])
  });
  backToHome(): void {
    this.router.navigate(['/']);
  }

  myfunction(): void {
    this.isvalid = !this.isvalid;
    console.log('test')
  }
  loginSubmit():void {
    if(this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const loginData = this.loginForm.value;
    this.api.getUsers().subscribe(users => {
      let userFound = false;
      for(let i = 0;i <users.length; i++){
        if(users[i].email == loginData.email && users[i].password == loginData.password){

          localStorage.setItem("loggedInUser",JSON.stringify(users[i]));
          userFound = true;

          this.toastr.success('Logged in successfully','Success'); //Show Success Toast
             this.router.navigate(['/dashboard']);
             break;
        }
      }
      if(!userFound) {
        // alert("user not registered or invalid credentials");
        this.toastr.error( 'Invalid email or password','Login Failed');
      }
    });
 
  }
  forgotPassword() :void {
    this.dialog.open(ForgotPassword, {
      width:'450px',
      panelClass: 'forgot-password-dialog' 
      //  added custom class when opening Forgot Password dialog bcz
      // it targets outermost container wrapper of that component & Enables Global Styling
    });
  }
}
