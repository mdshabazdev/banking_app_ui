import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceUtil } from '../../services/service-util';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss'
})
export class WithdrawComponent {
  withdrawForm: FormGroup;
  accountIds = [];
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private serviceUtil: ServiceUtil) {
    this.withdrawForm = this.fb.group({
      accountId: ['', Validators.required],
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
      accountId: this.withdrawForm.controls["accountId"].value,
      amount: this.withdrawForm.controls["amount"].value
    };

    this.isSubmitting = true;
    this.serviceUtil.request('post', '/transaction/withdraw', null, body)
    .then((data) => {
      if(data.message) {
        this.snackBar.open(data.message, 'Close',{duration: 6000});
        this.withdrawForm.reset();
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
