import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceUtil } from '../../services/service-util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide: boolean = true;
  registerForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private serviceUtil: ServiceUtil) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required], 
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register() {
    const body = {
      firstName: this.registerForm.controls["firstName"].value,
      lastName: this.registerForm.controls["lastName"].value,
      email: this.registerForm.controls["email"].value,
      contact: this.registerForm.controls["contact"].value,
      username: this.registerForm.controls["username"].value,
      password: this.registerForm.controls["password"].value,
      role: 'ROLE_USER',
      userstatus: 'enabled'
    };

    this.isSubmitting = true;
    this.serviceUtil.request('post', '/auth/register', null, body)
    .then((data) => {
      if(data.token) {
        this.snackBar.open("Registration successful", 'Close');
        this.router.navigate(['/auth/login']);
      } else if (data.error) {
        this.snackBar.open(data.error.message, 'Close',{duration: 3000});
      } else {
        this.snackBar.open(data, 'Close',{duration: 3000});
      }
      this.isSubmitting = false;
    })
    .catch((error)=> {
      this.isSubmitting = false;
      this.snackBar.open("Some error occurred", 'Close',{duration: 3000});
    });
  }

}
