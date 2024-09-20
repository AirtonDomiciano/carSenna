import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ElectronService } from '../../shared/services/electron.service';
import { Customers } from '../../shared/interface/clientes.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule],
  selector: 'app-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.scss'],
})
export default class CustomersComponent implements OnInit {
  customers: Customers[] = [];

  constructor(private router: Router, private http: ElectronService) {}

  async ngOnInit() {
    await this.http.loadData();
    const res = this.http.getData('customers');
    console.log('res', res);

    if (res?.length > 0) {
      this.customers = res;
    }
  }

  add() {
    this.router.navigate(['customer/0']);
  }

  edit(id: number) {
    this.router.navigate([`customer/${id}`]);
  }

  delete($event: any) {}
}
