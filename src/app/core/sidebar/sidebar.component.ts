import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isExpanded = false;
  @Output() onToggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.onToggleEvent.emit(this.isExpanded);
  }
}
