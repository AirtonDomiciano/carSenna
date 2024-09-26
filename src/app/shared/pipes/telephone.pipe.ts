import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'telephone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const telefone = value.replace(/\D+/g, '');
    const match = telefone.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return telefone;
  }
}
