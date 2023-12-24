import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_URI } from 'src/app/shared/constants/urls';
import { IFetchUser, ILogin_Response, IReg_response, IUser, IUser_Login } from 'src/app/shared/interface/user.interface';
const USER_KEY ="User"
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnChanges {

  private userSubject = new BehaviorSubject<string>(this.getUserFromLocalStorage())
  public userObservable!:Observable<string>

  constructor(
    private http:HttpClient,
    private toastrService:ToastrService,
    private router:Router
  ) { 
    console.log("this.userObservable1",this.userObservable)
    this.userObservable = this.userSubject.asObservable()
    console.log("this.userObservable2",this.userObservable)
  }
/////////////////////////////////////////////////////////////////////////////////////
  ngOnChanges(changes: SimpleChanges): void {
    console.log("onchanges",this.userObservable)
  }
/////////////////////////////////////////////////////////////////////////////////////
private setUserToLocalStorage(user:string){
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
/////////////////////////////////////////////////////////////////////////////////////
private getUserFromLocalStorage():string {
  const userKey = localStorage.getItem(USER_KEY)
  if(userKey){
    return JSON.parse(userKey) as string
  }else{
    return ""
  }
}
/////////////////////////////////////////////////////////////////////////////////////
  userRegister(userData:IUser):Observable<IReg_response>{
    console.log(userData)
    return this.http.post<IReg_response>(`${USER_URI}/register`,userData).pipe(
      tap({
        next:(data)=>{
          this.toastrService.success(`${data.message}`,"Success")
        },
        error:(errorRes)=>{
          this.toastrService.error(`${errorRes.error.message}`)
        }
      })
    )
  }
/////////////////////////////////////////////////////////////////////////////////////
userLogin(userData:IUser_Login):Observable<ILogin_Response>{
  return this.http.post<ILogin_Response>(`${USER_URI}/login`,userData).pipe(
    tap({
      next:(data)=>{
        this.setUserToLocalStorage(data.token)
        this.userSubject.next(data.token)
        this.toastrService.success(`${data.message}`,"Success")
      },
      error:(error)=>{
        this.toastrService.error(`${error.error.message}`,"Failed")
      }
    })
  )
}
/////////////////////////////////////////////////////////////////////////////////////
userLogout(){
  return localStorage.removeItem(USER_KEY)
}
/////////////////////////////////////////////////////////////////////////////////////
fetchUser():Observable<IFetchUser>{
 return this.http.get<IFetchUser>(`${USER_URI}/fetch-user`).pipe(
  tap({
    next:()=>{

    },
    error:(error)=>{
      this.toastrService.error(`${error.error.message}`,"Failed")
      this.router.navigate(["/"])
    }
  })
 )
}

/////////////////////////////////////////////////////////////////////////////////////
}
