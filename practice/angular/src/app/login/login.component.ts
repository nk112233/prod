import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CommonModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  luser = {
    username : '',
    password : ''
  };

  constructor(private router : Router){

  }

  login(){
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    
    
    const user = users.find((u:any) => 
      u.name === this.luser.username && u.password === this.luser.password);
    console.log(user);
    
    if(user){
      alert("Login Successful!");
      localStorage.setItem("loggedIn" , JSON.stringify(user));
      this.router.navigate(["/profile"]);
    }
    else{
      alert("Invalid Credentials");
    }
  }
}
