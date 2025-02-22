import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../shared/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxMaskDirective } from 'ngx-mask';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatProgressSpinnerModule,
    NgxMaskDirective,
  ],
})
export class UserUpdateComponent implements OnInit {
  updateForm!: FormGroup;
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
  toast = inject(NgToastService);
  private isDataLoaded: boolean = false;
  private apiUrl = environment.apiUrl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();

    this.updateForm.get('postal_code')?.valueChanges.subscribe((value) => {
      const cleanedValue = value.replace(/\D/g, '');

      if (this.isDataLoaded && cleanedValue && cleanedValue.length === 8) {
        this.fetchAddressData(cleanedValue);
      }
    });
  }

  private fetchAddressData(postalCode: string): void {
    this.http.get(`https://opencep.com/v1/${postalCode}`).subscribe({
      next: (response: any) => {
        this.updateForm.patchValue({
          street: response.logradouro,
          neighborhood: response.bairro,
          complement: response.complemento,
          city: response.localidade,
          state: response.uf,
        });
      },
      error: (error) => {
        console.error('Erro ao buscar dados do endereço:', error);
      },
    });
  }

  initializeForm() {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      issuing_agency: ['', Validators.required],
      postal_code: ['', Validators.required],
      street: ['', Validators.required],
      house_number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
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
      this.updateForm.patchValue(response.data);

      this.isDataLoaded = true;
    } catch (error) {
      this.errorMessage = 'Erro ao carregar os dados do usuário.';
    } finally {
      this.isLoading = false;
    }
  }

  removeMask(fieldName: string): void {
    const value = this.updateForm.get(fieldName)?.value;
    if (value) {
      const cleanedValue = value.replace(/\D/g, '');
      this.updateForm.get(fieldName)?.setValue(cleanedValue);
    }
  }

  async onSubmit() {
    if (this.updateForm.invalid) return;

    try {
      this.isLoading = true;
      this.removeMask('cpf');
      this.removeMask('rg');
      this.removeMask('postal_code');

      const updatedData = this.updateForm.value;

      await axios.put(`${this.apiUrl}/users/`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      this.authService.updateUserName(updatedData.name); // Atualiza o nome do usuário no AuthService

      this.toast.success('Dados atualizados com sucesso!', 'Fechar', 3000);
      this.router.navigate(['/profile']);
    } catch (error) {
      this.errorMessage = 'Erro ao atualizar os dados.';
    } finally {
      this.isLoading = false;
    }
  }
}
