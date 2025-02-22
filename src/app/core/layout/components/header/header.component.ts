import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string = '';
  private usernameSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usernameSubscription = this.authService
      .getUsernameObservable()
      .subscribe((name) => {
        this.username = name; // Atualiza o username quando houver mudanças
      });

    this.username = this.authService.getUserName(); // Inicializa o username
  }

  ngOnDestroy(): void {
    this.usernameSubscription.unsubscribe(); // Limpa a assinatura ao destruir o componente
  }
}
