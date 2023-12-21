import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { PasswordValidators } from 'src/app/shared/passwordValidators/password.match.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!:FormGroup;

  constructor(
    private userService: UserService,
    private fb :FormBuilder,
    private router:Router
  ){}
ngOnInit(): void {
  this.registerForm = this.fb.group({
    username:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    phone:["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    passowrd:["",Validators.required,Validators.pattern("/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/")],
    cpassword:["",Validators.required]
  },{
    validator:PasswordValidators('password','cpassword')
  })
}

submit(){
  if(this.registerForm.invalid) return
  this.userService.userRegister(this.registerForm.value).subscribe((data)=>{
    alert(data)
  })
}

}
