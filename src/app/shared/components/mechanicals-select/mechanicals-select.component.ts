import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElectronService } from '../../services/electron.service';
import { CommonModule } from '@angular/common';
import Mechanical from '../../models/mechanical';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-mechanicals-select',
  template: ` <div [formGroup]="form">
    <div class="form-group">
      <label>{{ label }}</label>
      <select
        class="form-select form-select-lg mb-3"
        formControlName="{{ frmName }}"
        (ngModelChange)="onChange($event)"
      >
        <option *ngFor="let option of mechanicals" [value]="option.id">
          {{ option.id }} - {{ option.name }}
        </option>
      </select>
    </div>
  </div>`,
})
export class MechanicalsSelectComponent implements OnInit {
  mechanicals: Mechanical[] = [];

  @Input() form!: FormGroup;
  @Input() label: string = 'Selecione o Mecânico';
  @Input() frmName: string = '';
  @Input() typeList: string = 'mechanicals';

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  public placeholder = 'Selecione o Mecânico.';

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    const res = await this.http.loadData('mechanicals');

    if (res?.length > 0) {
      this.mechanicals = res;
    }
  }

  onChange(id: any): void {
    if (+id) {
      this.onSelect.emit(this.mechanicals.find((el) => el.id == Number(id)));
    }
  }
}
