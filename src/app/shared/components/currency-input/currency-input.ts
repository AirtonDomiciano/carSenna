import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-currency-input',
  template: `<div [formGroup]="form">
    <div class="form-floating">
      <input
        type="text"
        id="currency"
        class="form-control"
        formControlName="{{ frmName }}"
        [ngClass]="{
          'is-invalid': form.get(frmName)?.invalid && form.get(frmName)?.touched
        }"
        (input)="formatCurrency($event)"
        placeholder="R$ 0,00"
        [disabled]="disabled"
      />
      <label for="currency">{{ label }}</label>
    </div>

    <!-- <div
      *ngIf="form.get(frmName)?.invalid && form.get(frmName)?.touched"
      class="text-danger"
    >
      Valor inválido. Formato esperado: R$ 0,00
    </div> -->
  </div> `,
})
export class CurrencyInputComponent {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() label: string = 'Valor';
  @Input() disabled: boolean = false;

  @Output() onEmitter: EventEmitter<void> = new EventEmitter();

  formatCurrency(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 0) {
      input = input.replace(/(\d)(\d{2})$/, '$1,$2');
      input = 'R$ ' + input;
    }

    this.form.get(this.frmName)?.setValue(input, { emitEvent: false });

    this.onEmitter.emit();
  }
}
