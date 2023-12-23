import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const ERROR_MESSAGE:any={
  required:"value shoul be required",
  email:"email should be valid",
  noMatch:"confirm password does'nt match",
  minlength:"values are too short"
}
@Component({
  selector: 'input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.css']
})
export class InputValidatorComponent implements OnInit, OnChanges{
errorMessages:string[]=[]

@Input()
showErrorWhen:boolean=true;

@Input()
control!:AbstractControl;
ngOnInit(): void {
  this.control.valueChanges.subscribe(()=>{
    this.checkValidator()
  })
  this.control.statusChanges.subscribe(()=>{
    this.checkValidator()
  })
  
}

ngOnChanges(changes: SimpleChanges): void {
  this.checkValidator()
}

checkValidator(){
  const error = this.control.errors
  if(!error){
    this.errorMessages=[]
    return
  }else{
    const errorkey = Object.keys(error)
    this.errorMessages=errorkey.map(key=>ERROR_MESSAGE[key])
    return
  }
}




}
