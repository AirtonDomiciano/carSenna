import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import NovaOsModel from '../../models/os';
import { itemsNota } from '../../interfaces/items-nota.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.css'],
})
export class ScreenshotComponent {
  preview: any = new NovaOsModel();
  @Input() form!: FormGroup;
  @Input() itemsNota: itemsNota[] = [];

  constructor(private elementRef: ElementRef) {}

  visualizarNotaFiscal() {
    const nota = this.form.value;

    this.preview = { ...nota };
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
    const element = document.querySelector(
      '.nota-fiscal-container'
    ) as HTMLElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'nota-fiscal.png';
      link.click();
    });
  }
}
