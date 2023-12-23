import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class UserTokenInterceptorService implements HttpInterceptor{

    constructor(){}
    intercept(_req: HttpRequest<any>, _next: HttpHandler): Observable<HttpEvent<any>> {
       let userData = localStorage.getItem('User')
       let parseToken = userData?JSON.parse(userData):''
       let token = parseToken?parseToken:''
        let jwttoken = _req.clone({
            setHeaders:{
                'x-auth-user':token ? token :''
            }
        })
        return _next.handle(jwttoken)
    } 
}