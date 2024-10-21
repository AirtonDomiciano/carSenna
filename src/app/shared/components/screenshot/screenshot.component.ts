import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import NovaOsModel from '../../models/os';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [NgbModal],
})
export class ScreenshotComponent {
  @Input() preview!: NovaOsModel;

  constructor(public activeModal: NgbModal) {}

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

  dismissModal() {
    this.activeModal.dismissAll();
  }
}
