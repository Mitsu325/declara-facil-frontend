import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
  is_admin?: boolean;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernameSubject = new BehaviorSubject<string>(this.getUserName()); // Criar um BehaviorSubject para o nome do usuário

  constructor(private router: Router) {}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.usernameSubject.next(this.getUserName()); // Atualiza o nome do usuário quando o token é salvo
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.exp ? decodedToken.exp * 1000 > Date.now() : false;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  getUserName(): string {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.name || '';
      } catch (error) {
        return '';
      }
    }
    return '';
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.is_admin || false;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.usernameSubject.next(''); // Notifica que o nome do usuário está vazio
    this.router.navigate(['/login']);
  }

  // Método para retornar um Observable do nome do usuário
  getUsernameObservable() {
    return this.usernameSubject.asObservable();
  }

  // Método para atualizar o nome do usuário
  updateUserName(name: string) {
    this.usernameSubject.next(name);
  }
}
