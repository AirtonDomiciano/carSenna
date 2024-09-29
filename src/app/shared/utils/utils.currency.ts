import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class UtilsCurrencyService {
  constructor() {}

  getValor(valor: string): number {
    let numeros = valor.replace(/[^0-9,]/g, '');
    if (numeros.includes(',')) {
      return parseFloat(numeros.replace(',', '.'));
    } else {
      return parseInt(numeros);
    }
  }

  formatarValor(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
