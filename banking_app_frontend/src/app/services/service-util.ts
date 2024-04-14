import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";

const base='http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class ServiceUtil {
    constructor(private http: HttpClient, private tokenService: TokenService) {}

    public async request(method: string, url: string, headers?:any, data:any = {}, responseType?: any) {
        const token = this.tokenService.getToken();
        if(token) {
            headers = {...headers, ...{Authorization: `Bearer ${token}`}};
        }
        const result = this.http.request(method, `${base}/api${url}`, {
            body: data,
            responseType: responseType || 'json',
            observe: 'body',
            headers: headers
        });

        return new Promise<any>((resolve, reject) => {
            result.subscribe(resolve as any, reject as any);
        })
    }
}