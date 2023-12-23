import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { PasswordMatchValidator } from 'src/app/shared/passwordValidators/password.match.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 registerForm!:FormGroup;
 isSubmitted:boolean=false;
 constructor(
  private fb:FormBuilder,
  private userService:UserService,
  private router:Router
 ){}
  ngOnInit(): void {
  this.registerForm = this.fb.group({
    username:['',[Validators.required,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.email]],
    phone:['',[Validators.required]],
    password:['',[Validators.required,Validators.minLength(5)]],
    cpassword:['',[Validators.required]],
  },{
    validator:PasswordMatchValidator('password','cpassword')
  })
 }
 get fc(){
  return this.registerForm.controls
 }

 submit(){
  console.log("working")
  this.isSubmitted=true
  if(this.registerForm.invalid) return;
  this.userService.userRegister(this.registerForm.value).subscribe(()=>{
 this.router.navigate(['login'])
  })
 }

}
