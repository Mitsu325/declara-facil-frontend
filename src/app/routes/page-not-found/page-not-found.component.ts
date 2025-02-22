import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../core/layout/components/header/header.component';
import { FooterComponent } from '../../core/layout/components/footer/footer.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {}
