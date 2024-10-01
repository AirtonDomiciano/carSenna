import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BodyComponent } from './core/body/body.component';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ElectronService } from './shared/services/electron.service';
import registeredCompany from './shared/models/registered-company';
import { RegisteredCompanyComponent } from './pages/registered-company/registered-company.component';
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
    ToastModule,
    RegisteredCompanyComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export default class AppComponent implements OnInit {
  isExpanded = false;
  registeredCompany = false;

  conf: registeredCompany = new registeredCompany();

  constructor(private http: ElectronService) {}

  ngOnInit(): void {}

  async loadData() {
    this.conf = new registeredCompany();

    const res: registeredCompany = await this.http.loadData('config');

    if (res.cnpj?.length) {
      this.registeredCompany = true;
    }
  }

  toggleEvent(expande: boolean) {
    this.isExpanded = expande;
  }

  onRegistred(registred: boolean) {
    this.registeredCompany = registred;
  }
}
