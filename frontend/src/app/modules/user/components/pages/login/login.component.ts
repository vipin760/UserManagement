import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted:boolean=false;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private UserService:UserService
  ){}
 ngOnInit(): void {
   this.loginForm=this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required]],
   })
 }
 
 get fc(){
  return this.loginForm.controls
 }
 submit(){
  this.isSubmitted=true
  if(this.loginForm.invalid) return;
  this.UserService.userLogin(this.loginForm.value).subscribe(()=>{
    this.router.navigate(['home'])
  })  

 }

}
