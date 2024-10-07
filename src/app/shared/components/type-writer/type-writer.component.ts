import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-writer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-writer.component.html',
  styleUrl: './type-writer.component.scss',
})
export class TypeWriterComponent implements OnInit {
  @Input() text = '';

  public textWrite = '';

  ngOnInit(): void {
    this.typeWrite();
  }

  typeWrite(): void {
    const arrText = this.text.split('');
    arrText.forEach((el, i) => {
      this.writing(el, i);
    });
  }

  writing(letter: string, idx: number): void {
    setTimeout(() => {
      this.textWrite += letter;
    }, 100 * idx);
  }
}
