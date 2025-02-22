import { Injectable } from '@angular/core';
import { DeclarationRequestType } from '../domain/requests.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarationRequestService {
  private generatedDeclarationsSubject = new BehaviorSubject<
    DeclarationRequestType[]
  >([]);
  private totalRequestSubject = new BehaviorSubject<number>(0);
  private currentRequestSubject = new BehaviorSubject<number>(0);
  private progressValueSubject = new BehaviorSubject<number>(0);
  private summarySubject = new BehaviorSubject<{
    success: number;
    error: number;
  }>({ success: 0, error: 0 });

  generatedDeclarations$ = this.generatedDeclarationsSubject.asObservable();
  totalRequest$ = this.totalRequestSubject.asObservable();
  currentRequest$ = this.currentRequestSubject.asObservable();
  progressValue$ = this.progressValueSubject.asObservable();
  summary$ = this.summarySubject.asObservable();

  constructor() {}

  clean() {
    this.generatedDeclarationsSubject.next([]);
    this.totalRequestSubject.next(0);
    this.currentRequestSubject.next(0);
    this.progressValueSubject.next(0);
    this.summarySubject.next({ success: 0, error: 0 });
  }

  setGeneratedDeclarations(data: DeclarationRequestType[]) {
    const currentDeclarations = this.generatedDeclarationsSubject.getValue();
    const updatedDeclarations = [
      ...currentDeclarations,
      ...data.filter(
        (newDecl) =>
          !currentDeclarations.some(
            (existingDecl) => existingDecl.id === newDecl.id
          )
      ),
    ];
    this.generatedDeclarationsSubject.next(updatedDeclarations);
  }

  setTotalRequest(total: number) {
    this.totalRequestSubject.next(total);
  }

  setCurrentRequest(value: number) {
    this.currentRequestSubject.next(value);

    const progressValue =
      (this.currentRequestSubject.getValue() /
        this.totalRequestSubject.getValue()) *
      100;

    this.progressValueSubject.next(progressValue);
  }

  incrementSuccessCount() {
    const currentSummary = this.summarySubject.getValue();
    const updatedSummary = {
      success: currentSummary.success + 1,
      error: currentSummary.error,
    };
    this.summarySubject.next(updatedSummary);
  }

  incrementErrorCount() {
    const currentSummary = this.summarySubject.getValue();
    const updatedSummary = {
      success: currentSummary.success,
      error: currentSummary.error + 1,
    };
    this.summarySubject.next(updatedSummary);
  }
}
