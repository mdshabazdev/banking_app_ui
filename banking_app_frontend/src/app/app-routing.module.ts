import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'banking',
    loadChildren:()=>import('./main/main.module').then(mod => mod.MainModule),
    canActivate: mapToCanActivate([AuthGuard])
  },
  {
    path:'auth',
    loadChildren:()=>import('./user-auth/user-auth.module').then(mod => mod.UserAuthModule)
  },
  {
    path:'', redirectTo: 'banking',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
