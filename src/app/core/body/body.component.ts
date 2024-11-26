import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  animations: [],
})
export class BodyComponent {
  @Input() isExpanded = false;
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }
}
