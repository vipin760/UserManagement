import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/pages/register/register.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserComponent, 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class UserModule { }
