import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user = {
    name : '',
    email : '',
    password : ''
  };

  constructor(private router: Router) {}

  register(){
    
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    users.push(this.user);
    localStorage.setItem("users" , JSON.stringify(users));
    this.router.navigate(['/']);
  }
}
