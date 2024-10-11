import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElectronService } from '../../shared/services/electron.service';
import Customer from '../../shared/models/customer';
import TableDataComponent from '../../shared/components/table/table.component';
import { CustomerComponent } from '../customer/customer.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableDataComponent,
    CustomerComponent,
    SearchComponent,
    TableModule,
  ],
  selector: 'app-customers',
  templateUrl: 'customers.component.html',
  styleUrls: ['customers.component.scss'],
})
export default class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  @ViewChild(CustomerComponent) customer!: CustomerComponent;

  constructor(private http: ElectronService) {}

  async ngOnInit() {
    this.loadData();
    // this.http.addTypeData('customers');
  }

  async loadData(customers?: any) {
    if (customers) {
      this.customers = customers;
    } else {
      this.customers = [];
      const res = await this.http.loadData('customers');

      if (res?.length > 0) {
        this.customers = res;
      }
    }
  }

  add() {
    this.customer.add();
  }

  onEventClickBotaoAcoes($event: any) {
    switch ($event.id) {
      case 'id-edit':
        this.customer.edit($event.obj);
        break;
      case 'id-trash':
        this.customer.delete($event.obj.id);
        break;
      default:
        break;
    }
  }
}
