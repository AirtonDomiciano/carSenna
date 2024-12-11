import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OnlyNumbersDirective,
  ],
  selector: 'app-cpf-input',
  template: `<div [formGroup]="form">
    <div class="form-floating">
      <input
        type="text"
        id="phoneNumber"
        class="form-control"
        formControlName="{{ frmName }}"
        [ngClass]="{
          'is-invalid': form.get(frmName)?.invalid && form.get(frmName)?.touched
        }"
        (input)="formatCPF($event)"
        placeholder="999.999.999-99"
        onlyNumbers
      />
      <label for="phoneNumber">CPF</label>
    </div>

    <div
      *ngIf="form.get(frmName)?.invalid && form.get(frmName)?.touched"
      class="text-danger"
    >
      CPF inválido. Formato esperado: 999.999.999-99
    </div>
  </div> `,
})
export class CpfInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    this.form.controls[this.frmName].setValidators([
      Validators.required,
      Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    ]);
  }

  formatCPF(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 11) {
      input = input.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (input.length > 9) {
      input = input.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
    } else if (input.length > 6) {
      input = input.replace(/^(\d{3})(\d{3})/, '$1.$2.');
    } else if (input.length > 3) {
      input = input.replace(/^(\d{3})/, '$1.');
    }

    this.form.get(this.frmName)?.setValue(input, { emitEvent: false });
  }
}
