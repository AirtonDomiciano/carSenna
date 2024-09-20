import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-deashboard',
  templateUrl: './deashboard.component.html',
  styleUrl: './deashboard.component.css',
})
export default class DeashBoardComponent {}
