import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges{
  token!:boolean;
constructor(
  private userService:UserService
){
  userService.userObservable.subscribe(newToken=>{
    this.token = newToken.length>0
  })
}
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
logOut(){
  this.userService.userLogout()
}
  
}
