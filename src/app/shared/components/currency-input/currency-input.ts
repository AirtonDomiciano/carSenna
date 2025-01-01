import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-currency-input',
  template: `
    <div [formGroup]="form">
      <div class="form-floating">
        <input
          type="text"
          id="currency"
          class="form-control"
          [value]="formattedValue"
          (input)="onInput($event)"
          (blur)="onBlur()"
          placeholder="R$ 0,00"
          [disabled]="disabled"
        />
        <label for="currency">{{ label }}</label>
      </div>
    </div>
  `,
})
export class CurrencyInputComponent implements OnInit, OnDestroy {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() label: string = 'Valor';
  @Input() disabled: boolean = false;

  @Output() onEmitter: EventEmitter<number> = new EventEmitter<number>();

  formattedValue: string = '';
  private subscription!: Subscription;

  ngOnInit(): void {
    const initialValue = this.form.get(this.frmName)?.value || 0;
    this.updateFormattedValue(initialValue);

    this.subscription = this.form.controls[
      `${this.frmName}`
    ].valueChanges.subscribe((newValue) => {
      this.updateFormattedValue(newValue);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onInput(event: any): void {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const numericValue = parseFloat(rawValue) / 100; // Converte para número decimal
    this.form.get(this.frmName)?.setValue(numericValue, { emitEvent: true });
    this.updateFormattedValue(numericValue);
  }

  onBlur(): void {
    const value = this.form.get(this.frmName)?.value;
    this.updateFormattedValue(value);
    this.onEmitter.emit();
  }

  private updateFormattedValue(value: number): void {
    if (value) {
      this.formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    } else {
      this.formattedValue = 'R$ 0,00';
    }
  }
}
