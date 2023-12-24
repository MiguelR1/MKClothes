import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from '../store/pages/nav/nav.component';
import { HomeComponent } from '../store/pages/home/home.component';

const routes: Routes = [
  {path:'',
  children: [
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'', redirectTo: 'register', pathMatch: 'full'},
    {path:'**',redirectTo:'register'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
