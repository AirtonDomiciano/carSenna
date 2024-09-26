import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cpfCnpj',
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    const cpfCnpj = value.replace(/\D+/g, '');

    if (cpfCnpj.length === 11) {
      // CPF
      const match = cpfCnpj.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
      }
    } else if (cpfCnpj.length === 14) {
      // CNPJ
      const match = cpfCnpj.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
      if (match) {
        return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
      }
    }

    return cpfCnpj;
  }
}
