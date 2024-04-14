import { ServiceUtil } from "./service-util";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from "@angular/core";

const base='http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public jwtHelper: JwtHelperService, private serviceUtil: ServiceUtil) {}

    public isUserLoggedIn() {
        const token: any = localStorage.getItem('token');
        return token && !this.jwtHelper.isTokenExpired(token);
    }

}