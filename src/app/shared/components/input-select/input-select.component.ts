import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElectronService } from '../../services/electron.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-input-select',
  template: ` <div [formGroup]="form">
    <div class="form-group">
      <label>{{ label }}</label>
      <select
        class="form-select form-select-lg mb-3"
        formControlName="{{ frmName }}"
        (ngModelChange)="onChange($event)"
      >
        <option *ngFor="let option of itens" [value]="option.id">
          {{ option.id }} - {{ !objName ? option.name : option[objName] }}
        </option>
      </select>
    </div>
  </div>`,
})
export class InputSelectComponent implements OnInit {
  @Input() label: string = '';
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() itens: any[] = []; //IInputSelectItens
  @Input() idParent: number | null = null;
  @Input() typeList: string = '';
  @Input() objName: string = '';

  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();

  public placeholder = '';

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    this.placeholder = this.label;

    if (this.typeList?.length > 0) {
      const res = await this.http.loadData(this.typeList);

      if (res?.length > 0) {
        this.itens = res;
      }
    }
  }

  onChange(id: any): void {
    if (+id) {
      this.onSelect.emit(this.itens.find((el) => el.id == Number(id)));
    }
  }
}
