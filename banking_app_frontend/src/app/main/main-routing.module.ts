import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { MainComponentComponent } from '../main/main-component/main-component.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes = [
  {
    path: '', component: MainComponentComponent,
    children: [
      {
        path:'', redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'withdraw', component: WithdrawComponent
      },
      {
        path: 'deposit', component: DepositComponent
      },
      {
        path: 'send', component: SendMoneyComponent
      },
      {
        path: 'createAccount', component: CreateAccountComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
