import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard {

    constructor(private router: Router, private auth: AuthService) {}

    canActivate() {
        if(this.auth.isUserLoggedIn()){
            return true;
        }
        this.router.navigate(['/auth/login'])
        return false;
      }
}