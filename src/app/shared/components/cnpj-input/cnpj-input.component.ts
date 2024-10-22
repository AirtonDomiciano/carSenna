import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
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
  selector: 'app-cnpj-input',
  template: `
  <div [formGroup]="cnpjForm">
    <div class="form-floating">
      <input
        type="text"
        id="cnpj"
        class="form-control"
        formControlName="{{ frmCNPJ }}"
        [ngClass]="{
          'is-invalid':
            cnpjForm.get(frmCNPJ)?.invalid && cnpjForm.get(frmCNPJ)?.touched
        }"
        (input)="formatCNPJ($event)"
        placeholder="99.999.999/9999-99"
        onlyNumbers
      />
      <label for="cnpj">CNPJ</label>
    </div>

    <div
      *ngIf="
        !cnpjForm.get(frmCNPJ)?.value &&
        cnpjForm.get(frmCNPJ)?.invalid &&
        cnpjForm.get(frmCNPJ)?.touched
      "
      class="text-danger"
    >
      CNPJ não informado.
    </div>
    <div
      *ngIf="
        cnpjForm.get(frmCNPJ)?.value &&
        cnpjForm.get(frmCNPJ)?.invalid &&
        cnpjForm.get(frmCNPJ)?.touched
      "
      class="text-danger"
    >
      CNPJ inválido. Formato esperado: 99.999.999/9999-99
    </div>
  </div> `,
})
export class CnpjInputComponent implements OnInit {
  @Input() cnpjForm!: FormGroup;
  @Input() frmCNPJ: string = '';
  @Input() isRequired: boolean = false;

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    const validators = [
      Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
    ];

    if (this.isRequired) {
      validators.push(Validators.required);
    }

    this.cnpjForm.controls[this.frmCNPJ].setValidators(validators);
  }

  formatCNPJ(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 14) {
      input = input.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    } else if (input.length > 11) {
      input = input.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-');
    } else if (input.length > 8) {
      input = input.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2.$3/');
    } else if (input.length > 5) {
      input = input.replace(/^(\d{2})(\d{3})/, '$1.$2.');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})/, '$1.');
    }

    this.cnpjForm.get(this.frmCNPJ)?.setValue(input, { emitEvent: false });
  }
}
