import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { ElectronService } from '../../shared/services/electron.service';
import { Customers } from '../../shared/interface/clientes.interface';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-cliente',
  templateUrl: 'customer.component.html',
})
export class CustomerComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private http: ElectronService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      telephone: [''],
      email: [''],
    });


  }

  salvarDados() {
    const customer = this.form.value
    this.http.addTypeData('customers')
    let customers: Customers[] = this.http.getData('customers')

    if (!customers?.length) {
      customers = []
    }
    
    customers.push(customer);

    this.http.addData(customers);

    this.http.saveData();
  }
}
