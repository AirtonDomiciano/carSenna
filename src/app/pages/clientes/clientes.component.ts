import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ElectronService } from '../../shared/services/electron.service';
import { Clientes } from '../../shared/interface/clientes.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  selector: 'app-clientes',
  templateUrl: 'clientes.component.html',
  styleUrls: ['clientes.component.scss'],
})
export default class ClientesComponent implements OnInit {
  customers: Clientes[] = [];

  constructor(private router: Router, private http: ElectronService) {}

  ngOnInit() {
    this.http.loadData();
    const res = this.http.getData('clientes');
    console.log('res', res);
    
    if (res?.length > 0) {
      this.customers = res
    } else {
      console.log('CAIU AQUI')
      this.customers = []
    }

  }

  add() {
    this.router.navigate(['client']);
  }

  edit(id: number) {
    this.router.navigate([`client/${id}`]);
  }

  delete($event: any) {}
}
