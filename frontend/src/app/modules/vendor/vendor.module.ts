import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ListUsersComponent } from './components/pages/list-users/list-users.component';
import { VendorComponent } from './vendor.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ListUsersComponent,
    VendorComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }
