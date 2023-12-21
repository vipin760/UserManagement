import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashbordComponent } from './components/pages/dashbord/dashbord.component';
import { ListUserComponent } from './components/pages/list-user/list-user.component';
import { ListVendorComponent } from './components/pages/list-vendor/list-vendor.component';
import { LoginComponent } from './components/pages/login/login.component';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';
import { EditVendorComponent } from './components/pages/edit-vendor/edit-vendor.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    DashbordComponent,
    ListUserComponent,
    ListVendorComponent,
    LoginComponent,
    EditUserComponent,
    EditVendorComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
