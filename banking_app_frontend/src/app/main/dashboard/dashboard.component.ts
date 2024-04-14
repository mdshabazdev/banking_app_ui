import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceUtil } from '../../services/service-util';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  balance = 0;
  accountForm: FormGroup;
  accountIds = [];
  accounts = [];
  isSubmitting: boolean = false;

  pageObject = {
    "pageIndex": 0,
    "total": 0,
    "pageOptions": [10,20,30,40,50],
    "recordsPerPage": 10
  }

  displayedColumns: string[] = ['transactionId', 'timestamp', 'transactionType', 'amount'];
  dataSource = new MatTableDataSource<any>();

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private serviceUtil: ServiceUtil) {
    this.accountForm = this.fb.group({
      accountId: ['', Validators.required]
    })
  
  }
  ngOnInit(): void {
    this.dataSource.data = [];
    this.serviceUtil.request('get', '/account/fetchAccounts', null)
    .then((data) => {
      if(data.accounts) {
        this.accounts = data.accounts;
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

  getAccountType() {
    const account = this.accounts.filter((account:any) => account.accountId === this.accountForm.controls["accountId"].value)[0];
    return account? account['accountType'] : 'N/A';
  }

  getPage(pageEvent: any) {
    this.accountSelected(pageEvent.pageIndex, pageEvent.pageSize);
  }

  accountSelected(event: any, pageIndex: number = 0, pageSize: number = 10) {
    const body = {
      accountId: this.accountForm.controls["accountId"].value,
      pageIndex,
      pageSize
    };

    this.isSubmitting = true;
    this.serviceUtil.request('post', '/transaction/transactions', null, body)
    .then((data) => {
      if(data.transactionDetails) {
        this.balance = data.transactionDetails.balance;
        this.pageObject.pageIndex = data.transactionDetails.pageIndex;
        this.pageObject.recordsPerPage = data.transactionDetails.pageSize;
        this.dataSource.data = data.transactionDetails.transactions;
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
