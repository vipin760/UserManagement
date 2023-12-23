import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {

  @Input()
  control!:AbstractControl;

  @Input()
  type: 'text'|'email'|'tel'|'password'='text'

  @Input()
  placeholder!:string;

  @Input()
  showErrorWhen:boolean=true;

  get formControl(){
    return this.control as FormControl
  }
}
