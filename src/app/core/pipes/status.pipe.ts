import { Pipe, PipeTransform } from '@angular/core';
import { requestStatus } from '../../shared/domain/requests.type';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(status: requestStatus): string {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'completed':
        return 'Concluído';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  }
}
