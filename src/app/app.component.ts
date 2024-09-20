import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataComponent } from './data.component';
import { BodyComponent } from './core/body/body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    BodyComponent,
    FormsModule,
    DataComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export default class AppComponent implements OnInit {
  isExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggleEvent(expande: boolean) {
    this.isExpanded = expande;
  }
}
