import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataComponent } from './data.component';
import { BodyComponent } from './core/body/body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    BodyComponent,
    FormsModule,
    DataComponent,
    ToastModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export default class AppComponent implements OnInit {
  isExpanded = false;

  constructor() {}

  ngOnInit(): void {}

  toggleEvent(expande: boolean) {
    this.isExpanded = expande;
  }
}
