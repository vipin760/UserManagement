import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/pages/register/register.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { InputValidatorComponent } from './components/partials/input-validator/input-validator.component';
import { LoginComponent } from './components/pages/login/login.component';


@NgModule({
  declarations: [
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserComponent,
    TextInputComponent,
    InputValidatorComponent,
    LoginComponent, 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
