import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceUtil } from '../../services/service-util';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide: boolean = true;
  loginForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private serviceUtil: ServiceUtil, private tokenService: TokenService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  navigateRegister() {
    this.router.navigate(['auth/register']);
  }

  authenticate() {
    const body = {
      username: this.loginForm.controls["username"].value,
      password: this.loginForm.controls["password"].value
    };

    this.isSubmitting = true;
    this.serviceUtil.request('post', '/auth/authenticate', null, body)
    .then((data) => {
      if(data.token) {
        this.tokenService.setToken(data.token);
        this.router.navigate(['']);
      } else if (data.error) {
        this.snackBar.open("Bad credentials", 'Close',{duration: 3000});
      }else {
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
