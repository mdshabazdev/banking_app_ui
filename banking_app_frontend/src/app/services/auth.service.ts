import { ServiceUtil } from "./service-util";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";

const base='http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public jwtHelper: JwtHelperService, private serviceUtil: ServiceUtil, private tokenService: TokenService) {}

    public isUserLoggedIn() {
        const token = this.tokenService.getToken();
        return token && !this.jwtHelper.isTokenExpired(token);
    }

}