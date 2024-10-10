import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElectronService } from '../../services/electron.service';
import { CommonModule } from '@angular/common';
import Car from '../../models/car';

@Component({
  selector: 'app-cars-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: ` <div [formGroup]="form">
    <div class="form-group">
      <label>{{ label }}</label>
      <select
        class="form-select form-select-lg mb-3"
        formControlName="{{ frmName }}"
        (ngModelChange)="onChange($event)"
      >
        <option *ngFor="let option of cars" [value]="option.id">
          {{ option.modelo }} - {{ option.cor }} - {{ option.placa }}
        </option>
      </select>
    </div>
  </div>`,
  styleUrl: './cars-select.component.scss',
})
export class CarsSelectComponent {
  cars: Car[] = [];

  @Input() form!: FormGroup;
  @Input() label: string = 'Selecione o Carro';
  @Input() frmName: string = '';
  @Input() typeList: string = 'cars';

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  public placeholder = 'Selecione o Carro cadastrado.';

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    const res = await this.http.loadData('cars');
    if (res?.length > 0) {
      this.cars = res;
    }
  }

  onChange(id: any): void {
    if (+id) {
      this.onSelect.emit(this.cars.find((el) => el.id == Number(id)));
    }
  }
}
