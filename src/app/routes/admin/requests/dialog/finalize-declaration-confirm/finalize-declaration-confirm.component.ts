import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeclarationRequestType } from '../../../../../shared/domain/requests.type';

@Component({
  selector: 'app-finalize-declaration-confirm',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './finalize-declaration-confirm.component.html',
  styleUrl: './finalize-declaration-confirm.component.css',
})
export class FinalizeDeclarationConfirmComponent {
  data = inject(MAT_DIALOG_DATA);
  processingRequests: DeclarationRequestType[] = [];
  type: 'rejected' | 'completed' = 'completed';

  constructor(
    public dialogRef: MatDialogRef<FinalizeDeclarationConfirmComponent>
  ) {}

  ngOnInit() {
    this.processingRequests = this.data.requests;
    this.type = this.data.type;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
