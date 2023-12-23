import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { UserGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'home',canActivate:[UserGuard], component:HomeComponent},
    {path:'',redirectTo:'/login',pathMatch:'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
