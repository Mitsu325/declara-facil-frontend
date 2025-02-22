import { Component, HostListener } from '@angular/core';
import { DeclarationRequestType } from '../../../shared/domain/requests.type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { DeclarationRequestService } from '../../../shared/services/declaration-request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed-declarations',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatProgressBarModule,
  ],
  templateUrl: './completed-declarations.component.html',
  styleUrl: './completed-declarations.component.css',
})
export class CompletedDeclarationsComponent {
  declarations: DeclarationRequestType[] = [];
  totalRequest: number = 0;
  currentRequest: number = 0;
  progressValue: number = 0;
  summary: { success: number; error: number } = { success: 0, error: 0 };

  private declarationsSubscription: Subscription | undefined;
  private totalRequestSubscription: Subscription | undefined;
  private currentRequestSubscription: Subscription | undefined;
  private progressValueSubscription: Subscription | undefined;
  private summarySubscription: Subscription | undefined;

  constructor(private declarationRequestService: DeclarationRequestService) {}

  ngOnInit() {
    this.declarationsSubscription =
      this.declarationRequestService.generatedDeclarations$.subscribe(
        (declarations) => {
          this.declarations = declarations;
        }
      );

    this.totalRequestSubscription =
      this.declarationRequestService.totalRequest$.subscribe(
        (value) => (this.totalRequest = value)
      );

    this.currentRequestSubscription =
      this.declarationRequestService.currentRequest$.subscribe(
        (value) => (this.currentRequest = value)
      );

    this.progressValueSubscription =
      this.declarationRequestService.progressValue$.subscribe(
        (value) => (this.progressValue = value)
      );

    this.summarySubscription =
      this.declarationRequestService.summary$.subscribe((summary) => {
        this.summary = summary;
      });
  }

  ngOnDestroy() {
    if (this.declarationsSubscription) {
      this.declarationsSubscription.unsubscribe();
    }
    if (this.totalRequestSubscription) {
      this.totalRequestSubscription.unsubscribe();
    }
    if (this.currentRequestSubscription) {
      this.currentRequestSubscription.unsubscribe();
    }
    if (this.progressValueSubscription) {
      this.progressValueSubscription.unsubscribe();
    }
    if (this.summarySubscription) {
      this.summarySubscription.unsubscribe();
    }
  }

  downloadFile(url?: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    return true;
  }
}
