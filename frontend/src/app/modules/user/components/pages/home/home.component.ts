import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { IUser } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
userData!:IUser;
  constructor(
    private userService:UserService
  ){}
ngOnInit(): void {
  this.getUser()
}
getUser(){
  this.userService.fetchUser().subscribe((data)=>{
    this.userData = data.data
    console.log(this.userData)
  })
}

}
