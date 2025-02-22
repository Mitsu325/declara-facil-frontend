import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeclarationsService } from '../../../../../shared/services/api/declarations.service';
import { NgToastService } from 'ng-angular-popup';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FormatDeclarationTypes {
  id: string;
  type: string;
}

@Component({
  selector: 'app-request-confirm',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './request-confirm.component.html',
  styleUrl: './request-confirm.component.css',
})
export class RequestConfirmComponent {
  declarations: FormatDeclarationTypes[] = [];
  selectedDeclaration: string | null = null;
  toast = inject(NgToastService);

  constructor(
    public dialogRef: MatDialogRef<RequestConfirmComponent>,
    private declarationsService: DeclarationsService
  ) {}

  ngOnInit() {
    this.declarationsService.getDeclarationsType().subscribe({
      next: (data) => {
        this.declarations = data;
      },
      error: () => {
        this.toast.danger(
          'Tente novamente',
          'Falha ao carregar as declarações',
          5000
        );
      },
    });
  }

  onConfirm(): void {
    if (this.selectedDeclaration) {
      this.dialogRef.close(this.selectedDeclaration);
    }
  }
}
