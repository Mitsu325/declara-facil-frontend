import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp ? decodedToken.exp * 1000 > Date.now() : false;
    } catch (e) {
      return false;
    }
  }
}
