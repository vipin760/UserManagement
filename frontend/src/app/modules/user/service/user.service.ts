import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { USER_URI } from 'src/app/shared/constants/urls';
import { IReg_response, IUser } from 'src/app/shared/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private toastrService:ToastrService
  ) { }
/////////////////////////////////////////////////////////////////////////////////////
  userRegister(userData:IUser):Observable<IReg_response>{
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
}
