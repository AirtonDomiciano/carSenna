import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-loading-pages',
  templateUrl: 'loading-pages.component.html',
  styleUrls: ['loading-pages.component.scss'],
})
export class LoadingPagesComponent {
  @Input() text = '';
  writtenText = '';

  writeText(): void {
    this.writtenText = this.text;
  }
}
