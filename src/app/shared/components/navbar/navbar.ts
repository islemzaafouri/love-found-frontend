import { Component, inject, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/AuthService';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMenuOpen=false;
  private authService=inject(AuthService);
  private router=inject(Router);

  currentUser = this.authService.currentUser;

  


  get isLoggedIn(): boolean {
    return this.currentUser()!== null;
  }

  get isAdopter(): boolean {
    return this.currentUser()?.role === 'ADOPTER';
  }

  get isShelter(): boolean {
    return this.currentUser()?.role === 'SHELTER';
  }

  get isAdmin(): boolean {
    return this.currentUser()?.role === 'ADMIN';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();

    this.isMenuOpen = false;
    this.router.navigate(['/']);
  }

}
