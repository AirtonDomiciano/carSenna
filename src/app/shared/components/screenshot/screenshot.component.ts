import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import NovaOsModel from '../../models/os';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.css'],
})
export class ScreenshotComponent {
  // public notaFiscal
  notaFiscalPreview: NovaOsModel = new NovaOsModel(); // Variável para armazenar os dados da visualização

  visualizarNotaFiscal(formData: any) {
    // Copiamos os dados do formulário para uma variável sem alterá-los diretamente
    this.notaFiscalPreview = { ...formData };
    // Aqui você pode abrir um modal ou navegar para uma nova rota de visualização
  }

  takeScreenshot(): void {
    const element = document.getElementById('screenshot-target');

    if (element) {
      html2canvas(element).then((canvas) => {
        const imageUrl = canvas.toDataURL('image/png');
        this.downloadImage(imageUrl);
      });
    }
  }

  downloadImage(imageUrl: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'screenshot.png';
    link.click();
  }

  downloadNotaFiscal() {
    const element = document.querySelector('.nota-fiscal-container') as HTMLElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'nota-fiscal.png';
      link.click();
    });
  }
}
