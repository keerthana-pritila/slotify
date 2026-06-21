import { Component, inject } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../api';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
const LETTERS_PATTERN = '^[a-zA-Z ]+$';
const PHONE_PATTERN = '^[0-9]{10}$';

@Component({
  selector: 'app-admin-edit-dialog',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatDialogModule],
  templateUrl: './admin-edit-dialog.html',
  styleUrl: './admin-edit-dialog.scss',
})
export class AdminEditDialog {
  api = inject(Api);
  dialogRef = inject(MatDialogRef<AdminEditDialog>);
  toastr = inject(ToastrService);

  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern(LETTERS_PATTERN)
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(PHONE_PATTERN)]),
    points: new FormControl(0, [Validators.required, Validators.min(0)])
  });
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public user: any
  ) { }

  //Letter only function
  allowOnlyLetters(event: KeyboardEvent): void {
    const char = event.key;
    if (!/^[a-zA-Z ]$/.test(char)) {
      event.preventDefault();
    }
  }
  //number only 
  allowOnlyNumbers(event: KeyboardEvent): void {
    const char = event.key;
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {

    this.profileForm.patchValue({
      name: this.user.name,
      phone: this.user.phone,
      points: this.user.points
    });

  }

  saveUser(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();    //Force all validation errors to instantly display in the HTML
      return;
    }
    //Merge existing user data with the new form values using the spread operator
    const updatedUser = {
      ...this.user,
      ...this.profileForm.value
    };
    // Send the updated data to the backend server via an API service
    this.api.updateUser(this.user.id, updatedUser).subscribe(() => {
      this.toastr.success('User updated successfully', 'Success');
      //Once the server confirms success, close the modal and pass the fresh data back
      this.dialogRef.close(updatedUser);
    });
  }
}
