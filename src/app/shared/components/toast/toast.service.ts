import { Component, Injectable, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import Toast from '../../interface/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  mostrar(toast: Toast) {
    this.messageService.add({
      severity: toast.severity,
      summary: toast.summary,
      detail: toast.detail,
    });
  }

  mostrarSucesso(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: detail,
    });
  }

  mostrarAviso(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: detail,
    });
  }

  mostrarErro(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detail,
    });
  }

  mostrarInfo(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: detail,
    });
  }
}
