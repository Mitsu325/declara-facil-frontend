import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../shared/services/auth.service';
import { DeleteUserComponent } from './dialog/delete-user/delete-user.component';
import { MatDialog } from '@angular/material/dialog';
import { CpfPipe } from '../../../core/pipes/cpf.pipe';
import { RgPipe } from '../../../core/pipes/rg.pipe';
import { CepPipe } from '../../../core/pipes/cep.pipe';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CpfPipe,
    RgPipe,
    CepPipe,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isLoading = false;
  states: string[] = [
    'AC',
    'AL',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SE',
    'SP',
    'TO',
  ];
  errorMessage: string | null = null;
  dialog = inject(MatDialog);
  private apiUrl = environment.apiUrl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }],
      rg: [{ value: '', disabled: true }],
      issuing_agency: [{ value: '', disabled: true }],
      postal_code: [{ value: '', disabled: true }],
      street: [{ value: '', disabled: true }],
      house_number: [{ value: '', disabled: true }],
      complement: [{ value: '', disabled: true }],
      neighborhood: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
    });
  }

  async loadUserData() {
    try {
      this.isLoading = true;
      const response = await axios.get(`${this.apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Atualiza o nome do usuário no AuthService
      this.authService.updateUserName(response.data.name); // Atualiza o BehaviorSubject com o nome do usuário

      // Preenche o formulário com os dados do usuário
      this.profileForm.patchValue(response.data);
    } catch (error) {
      this.errorMessage = 'Erro ao carregar os dados do usuário.';
    } finally {
      this.isLoading = false;
    }
  }

  onEdit() {
    this.router.navigate(['/profile/update']);
  }

  openGenerateDeclarationConfirmDialog() {
    let dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
