import { Component, ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  isAdmin: boolean = false;
  currentOpenItem: string | null = null;
  initialized: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // Adicionado ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.checkCurrentRoute();

    this.initialized = true;

    // Força a detecção de mudanças após a inicialização
    this.cdr.detectChanges();
  }

  toggleMenu(menuItem: string | null): void {
    if (!this.initialized) return;

    if (this.currentOpenItem === menuItem) {
      this.currentOpenItem = null;
    } else {
      this.currentOpenItem = menuItem;
    }
  }

  checkCurrentRoute(): void {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/address')) {
      this.currentOpenItem = 'declaracoes';
    } else if (
      currentRoute.includes('/clients') ||
      currentRoute.includes('/users')
    ) {
      this.currentOpenItem = 'administracao';
    } else if (currentRoute.includes('/requests')) {
      this.currentOpenItem = 'requests';
    } else {
      this.currentOpenItem = null;
    }

    // Força a detecção de mudanças após a verificação de rota
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
