import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './core/navbar/navbar.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ElectronService } from './shared/services/electron.service';

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
  providers: [ElectronService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export default class AppComponent implements OnInit {
  isExpanded = false;

  constructor(private electronService: ElectronService) {}

  ngOnInit(): void {
    const data = this.electronService.getData();
    console.log('Received data in component:', data);
    // atualize seu componente com os dados lidos
  }

  toggleEvent(expande: boolean) {
    this.isExpanded = expande;
  }
}


