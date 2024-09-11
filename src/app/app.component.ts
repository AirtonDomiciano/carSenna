import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DatabaseService } from './shared/services/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidebarComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isExpanded = false;
  cars: any[] = [];

  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    await this.loadCars();
  }

  toggleEvent(expande: boolean) {
    this.isExpanded = expande;
  }

  async loadCars() {
    this.cars = (await this.databaseService.getCars()) || [];
  }

  async addCar() {
    await this.databaseService.addCar('Toyota', 'Corolla', 2022);
    await this.loadCars();
  }
}
