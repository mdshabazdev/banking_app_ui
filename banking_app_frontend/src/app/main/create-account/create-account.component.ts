import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceUtil } from '../../services/service-util';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;
  accountTypes = ['Savings', 'Current'];
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private serviceUtil: ServiceUtil) {
    this.createAccountForm = this.fb.group({
      accountType: ['', Validators.required]
    })
  }

  submit() {
    const accountId = this.createAccountForm.controls["accountType"].value;
    this.isSubmitting = true;
    this.serviceUtil.request('post', `/account/createAccount/${accountId}`, null, null)
    .then((data) => {
      if(data.message) {
        this.snackBar.open(data.message, 'Close',{duration: 6000});
        this.createAccountForm.reset();
      } else if (data.error) {
        this.snackBar.open(data.error.message, 'Close',{duration: 3000});
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
