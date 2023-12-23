import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class UserGuard implements CanActivate {
  
  constructor(private router:Router){} 
canActivate():boolean{
  const token = localStorage.getItem('User')
  console.log(token)
  if(token){
    console.log("true")
    return true;
  }else{
    console.log("false")
    this.router.navigate(["/"])
    return false
  }

}
};
