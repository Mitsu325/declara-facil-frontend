import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgToastService } from 'ng-angular-popup';
import { UsersService } from '../../../../../shared/services/api/users.service';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  password: string = '';
  passwordInvalid: boolean = false;
  showPassword: boolean = false;
  toast = inject(NgToastService);

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private userService: UsersService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onConfirm(): void {
    if (this.password) {
      this.userService.deleteUser(this.password).subscribe({
        next: () => {
          this.toast.success(
            'Seu perfil foi excluído com sucesso',
            'Ação realizada!'
          );
          this.dialogRef.close(true);
        },
        error: () => {
          this.toast.warning(
            'Não foi possível seguir com a exclusão do perfil',
            'Erro'
          );
        },
      });
    }
  }
}
