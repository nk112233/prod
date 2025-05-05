import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any;
  constructor(private router:Router){
    this.user = JSON.parse(localStorage.getItem("loggedIn") || '[]');
  }

  logout(){
    localStorage.removeItem("loggedIn");
    this.router.navigate(['/']);
  }
}
