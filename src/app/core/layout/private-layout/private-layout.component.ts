import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, MenuComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css',
})
export class PrivateLayoutComponent {}
