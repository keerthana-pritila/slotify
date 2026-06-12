import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import { MatAnchor } from "@angular/material/button";
import { Api } from '../api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
   standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatAnchor,MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.scss',
})
export class ProfileDialog {
  api = inject(Api);
  snackBar = inject(MatSnackBar);
  dialogRef = inject(MatDialogRef<ProfileDialog>);

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10),
  Validators.minLength(10),]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)])
  });

  allowOnlyLetters(event: KeyboardEvent): void {
    //allowOnlyLetters -- function name
    //event: KeyboardEvent -- receives keyboard event information when user presses a key
    //void : function does not return anything
    //event: KeyboardEvent --receives keyboard event information when user presses a key
    const char = event.key;
    if (!/^[a-zA-Z]$/.test(char)) { //checks whether typed character is allowed.
      //if characater is invalid ,condiotion is true
      event.preventDefault();
    }
  }

   allowonlyNumbers(event: KeyboardEvent): void {
    const char = event.key;

    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.profileForm.controls.name.setValue(user.name);
      this.profileForm.controls.phone.setValue(user.phone);
      this.profileForm.controls.password.setValue(user.password);
    }
  }
  // updateProfile(): void {

  // }
  saveProfile(): void {
    if (this.profileForm.invalid) { //if any validation fails,stop execution.
      this.profileForm.markAllAsTouched(); // Force validation errors to display visually by triggering the 'touched' state on all fields.
      return;
    }

    const userData = JSON.parse(localStorage.getItem('loggedInUser')!);  //retirieve existing data
    //! -- tells 'loggedInUser' is not null.


    // Merge Form Changes
  // Combine the old user data with the new values from the form.
  // The spread operator (...) ensures fields not present in the form (like the user ID) are preserved.
    const updatedUser = { ...userData, ...this.profileForm.value };
    
     //  API Request
  // Send the merged data to the backend server using the user's unique ID.
    this.api.updateUser(userData.id, updatedUser).subscribe(() => {
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser)); // Save the freshly updated user object back into browser storage as a JSON string.
      // User Notification
      // Pop up a temporary message at the bottom of the screen to confirm the save was successful.
      this.snackBar.open('Profile updated successfully', 'Close',
        { duration: 3000 }
      );
        this.dialogRef.close(updatedUser);
    });
  }
}
