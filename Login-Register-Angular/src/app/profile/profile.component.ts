// components/profile.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule, FormsModule],
})
export class ProfileComponent {
  user: any;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();
    if (!this.user) {
      alert('Unauthorized');
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
