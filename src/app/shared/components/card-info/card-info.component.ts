import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfoComponent {
  @Input() startContent?: any;
  @Input() endContent?: any;
  @Input() title: string = '';
  @Input() growth?: string;
  @Input() value: any = '';

  // Determina se a tela é grande para alterar o alinhamento
  isLargeScreen = window.innerWidth >= 1200;

  constructor() {
    window.addEventListener('resize', () => {
      this.isLargeScreen = window.innerWidth >= 1200;
    });
  }
}
