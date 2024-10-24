import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ElectronService } from '../../services/electron.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-customers-select',
  template: ` <div [formGroup]="form">
    <div class="form-group">
      <label>{{ label }}</label>
      <select
        class="form-select form-select-lg mb-3"
        formControlName="{{ frmName }}"
        (ngModelChange)="onChange($event)"
      >
        <option *ngFor="let option of customers" [value]="option.id">
          {{ option.id }} - {{ option.name }}
        </option>
      </select>
    </div>
  </div>`,
  styleUrls: ['customers-select.component.scss'],
})
export class CustomersSelectComponent implements OnInit {
  customers: any[] = [];

  @Input() form!: FormGroup;
  @Input() label: string = 'Selecione o Proprietário';
  @Input() frmName: string = '';
  @Input() typeList: string = 'customers';

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  public placeholder = 'Selecione o Proprietário do veículo cadastrado.';

  constructor(private http: ElectronService) {
    this.customers = [
      { id: 1, name: 'vamos ver' },
      { id: 2, name: 'vamos ver 2' },
    ];
  }

  async ngOnInit(): Promise<void> {
    const res = await this.http.loadData('customers');

    if (res?.length > 0) {
      this.customers = res;
    }
  }

  onChange(id: any): void {
    if (+id) {
      this.onSelect.emit(this.customers.find((el) => el.id == Number(id)));
    }
  }
}
