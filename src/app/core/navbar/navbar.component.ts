import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DropdownPerfilComponent } from '../../shared/components/dropdown-perfil/dropdown-perfil.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DropdownPerfilComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public isExpanded = false;
  @Output() onToggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
    this.onToggleEvent.emit(this.isExpanded);
  }
}
