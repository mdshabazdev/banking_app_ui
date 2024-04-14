import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

const base='http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class ServiceUtil {
    constructor(private http: HttpClient) {}

    public async request(method: string, url: string, headers?:any, data:any = {}, responseType?: any) {
        if(localStorage.getItem('token')) {
            headers = {...headers, ...{Authorization: `Bearer ${localStorage.getItem('token')}`}};
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