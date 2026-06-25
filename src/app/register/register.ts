import { Component, inject } from '@angular/core';
import { Dks } from '../dks';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../api';
import { RegisterUser } from '../register-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  demo: string = '';
  isDisabled: boolean = true;
  passwordMismatch: boolean = false;
  // showSuccessPopUp: boolean = false;  //variable controls opening/closing the modal

  api = inject(Api);
  dks = inject(Dks);
  router = inject(Router);
  toastr = inject(ToastrService);

  registrationForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(10),
        // Validators.pattern('^[a-zA-Z ]+$')
        //         ^ - start of string
        //         [a - zA - Z] - allow
        //         a - z(small letters)
        //         A - Z(capital letters)
        //                space
        //         +-one or more characters
        //          $ - end of string
      ]
    }),
    phone: new FormControl<string>('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.maxLength(6), Validators.minLength(3)])
  })
  // backToHome(): void {
  //   // this.dks.isRegister = true;
  //    this.dks.isRegister = false;
  // }
  login(): void {
    this.dks.isLogin = true;
    this.dks.isRegister = false;
  }

  onRegistration(): void {
    console.log("submit clicked"); //console to check submit
    //Checks form validity + password match
    if (this.registrationForm.invalid || this.passwordMismatch) {
      console.log("form invalid");
      console.log(this.registrationForm.value);

      return;
    }
    const formData = this.registrationForm.value as RegisterUser;
    formData.points = 0; //initial points for every user
    console.log(formData);

    this.api.getUsers().subscribe(users => {
      //GET /users -- JSON Server returns all users from db.json.
      
      let duplicate = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email == formData.email) {
          // alert("email already exists");
          this.toastr.error('Email already exists', 'Registration Failed');
          duplicate = true;
          break;
        }
        if (users[i].phone == formData.phone) {
          // alert("phone number already exists");
          this.toastr.error('Email already exists', 'Registration Failed');
          duplicate = true;
          break;
        }
      }
      if (!duplicate) {
        this.api.registerUser(formData).subscribe({
          next: (res) => {
            // subscribe() -- wait for API response
            // () first block -- success case
            // (err) second block -- error case
            console.log("success");
            console.log(res);

           const toast =  this.toastr.success('Registration completed successfully please wait', 'Success '); //shows toast
            toast.onHidden.subscribe(()=>{ //onHidden is an event provided by ngx-toastr,It fires when the toast disappears.
              this.router.navigate(['/login']);
            }); 
           
            // alert("resgistered successfully");
            // this.showSuccessPopUp = true;
            this.registrationForm.reset();  //  reset form
            this.passwordMismatch = false;
            // setTimeout(() => {
            //   this.router.navigate(['/login']); //Navigates to Login after 1.5 seconds
            // }, 1500);
            
          },
          error: (err) => {
            console.log("api failed");
            console.log(err);
            this.toastr.error('Registration failed. Please try again.', 'Error'); //Show API error toast
          }
        });
      }
    });
  }
 
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
  //password validation
  //function name checkPassword , but does not return anything
  checkPassword(): void {
    const password = this.registrationForm.value.password;                  //getting values
    const confirmPassword = this.registrationForm.value.confirmPassword;    //getting values

    //Check if both passwords are different, and store the result in passwordMismatch
    this.passwordMismatch = password !== confirmPassword;
  }
}
