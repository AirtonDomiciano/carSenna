import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ElectronService } from '../../services/electron.service';
import { CommonModule } from '@angular/common';
import Customer from '../../models/customer';

export interface customerSelect {
  id: number;
  name: string;
}

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
  customers: customerSelect[] = [];
  
  @Input() form!: FormGroup;
  @Input() label: string = 'Selecione o Proprietário';
  @Input() frmName: string = '';
  @Input() typeList: string = 'customers'

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  public placeholder = 'Selecione o Proprietário do veículo cadastrado.';

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    await this.http.loadData();
    const res = this.http.getData(this.typeList);

    if (res?.length > 0) {
      this.customers = res;

      // this.customers = res.map((el: Customer) => {
      //   return {
      //     id: el.id,
      //     name: `${el.id} - ${el.name}`,
      //   };
      // });
    }
  }


  onChange(item: any): void {
    this.onSelect.emit(item);
  }
}
