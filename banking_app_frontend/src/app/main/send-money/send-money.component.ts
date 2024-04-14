import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceUtil } from '../../services/service-util';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.scss'
})
export class SendMoneyComponent {
  sendMoneyForm: FormGroup;
  accountIds = [];
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private serviceUtil: ServiceUtil) {
    this.sendMoneyForm = this.fb.group({
      fromAccountId: ['', Validators.required],
      ifsc: ['', Validators.required],
      accountId: ['', Validators.required],
      bankingName: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.serviceUtil.request('get', '/account/fetchAccounts', null)
    .then((data) => {
      if(data.accounts) {
        this.accountIds = data.accounts.map((account: any) => account.accountId);
      } else if (data.error) {
        this.snackBar.open(data.error.message, 'Close',{duration: 3000});
      }else {
        this.snackBar.open(data, 'Close',{duration: 3000});
      }
    })
    .catch((error)=> {
      this.snackBar.open("Some error occurred", 'Close',{duration: 3000});
    });
  }

  submit() {
    const body = {
      fromAccountId: this.sendMoneyForm.controls["fromAccountId"].value,
      ifscCode: this.sendMoneyForm.controls["ifsc"].value,
      accountId: this.sendMoneyForm.controls["accountId"].value,
      amount: this.sendMoneyForm.controls["amount"].value,
      bankingName: this.sendMoneyForm.controls["bankingName"].value
    };

    this.isSubmitting = true;
    this.serviceUtil.request('post', '/transaction/sendMoney', null, body)
    .then((data) => {
      if(data.message) {
        this.snackBar.open(data.message, 'Close',{duration: 6000});
        this.sendMoneyForm.reset();
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
