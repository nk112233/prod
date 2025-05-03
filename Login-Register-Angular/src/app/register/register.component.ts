// components/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  user = { name: '', email: '', username: '', password: '', city: '', dob: '', mobile: '' };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const result = this.auth.register(this.user);
    if (result.success) {
      alert('Registration successful!');
      this.router.navigate(['/']);
    } else {
      alert(result.message);
    }
  }
}
