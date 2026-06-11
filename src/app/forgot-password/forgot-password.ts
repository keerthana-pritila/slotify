import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Api } from '../api';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
//import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  api = inject(Api);
  toastr = inject(ToastrService);
  dialogRef = inject(MatDialogRef<ForgotPassword>);

  passwordMismatch = false;

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)])
  });
  checkPassword() : void {
    const password = this.forgotForm.value.password;
    const confirmPassword = this.forgotForm.value.confirmPassword;
    this.passwordMismatch = password !== confirmPassword;
  }
  resetPassword() : void {
    if(this.forgotForm.invalid || this.passwordMismatch) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    const formData = this.forgotForm.value;
    this.api.getUsers().subscribe(users => {
      const user = users.find(u => u.email === formData.email);
      if(!user) {
        this.toastr.error( 'Email not found','Error');
        return;
      }
      user.password = formData.password!; 
      //  replacing the old password with the new password.
      //  ! -- means "Trust me TypeScript, this value is not null or undefined."
      //  if '!' is not present then angular string thinks it could be  string or null or undefined
      this.api.updateUser(user.id!, user).subscribe(()=>{  //This sends the updated user back to JSON Server
        this.toastr.success('Password updated successfully','Success');
        this.dialogRef.close();
      });
    });
  }
}
