import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path : '' , component : LoginComponent},
    {path : 'register' , component : RegisterComponent},
    {path: 'profile', component:ProfileComponent}
];
