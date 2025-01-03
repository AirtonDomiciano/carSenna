import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';
import { ICompEvent } from '../../interfaces/comp-event.interface';

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
    <div [formGroup]="form">
      <div class="form-floating">
        <input
          type="text"
          id="cnpj"
          class="form-control"
          formControlName="{{ frmName }}"
          [ngClass]="{
            'is-invalid':
              form.get(frmName)?.invalid && form.get(frmName)?.touched
          }"
          (input)="formatCNPJ($event)"
          placeholder="99.999.999/9999-99"
          onlyNumbers
          (blur)="onBlur()"
          maxlength="18"
        />
        <label for="cnpj">CNPJ</label>
      </div>

      <div
        *ngIf="
          !form.get(frmName)?.value &&
          form.get(frmName)?.invalid &&
          form.get(frmName)?.touched
        "
        class="text-danger"
      >
        <!-- CNPJ não informado. -->
      </div>
      <!-- <div
        *ngIf="
          form.get(frmName)?.value &&
          form.get(frmName)?.invalid &&
          form.get(frmName)?.touched
        "
        class="text-danger"
      >
        CNPJ inválido. Formato esperado: 99.999.999/9999-99
      </div> -->
    </div>
  `,
})
export class CnpjInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() isRequired: boolean = false;

  @Output() onEvent: EventEmitter<ICompEvent<null>> = new EventEmitter<
    ICompEvent<null>
  >();

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

    this.form.controls[this.frmName].setValidators(validators);
  }

  formatCNPJ(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 14) {
      input = input.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
    } else if (input.length === 12) {
      input = input.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    } else if (input.length > 11) {
      input = input.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-');
    } else if (input.length > 8) {
      input = input.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2.$3/');
    } else if (input.length > 5) {
      input = input.replace(/^(\d{2})(\d{3})/, '$1.$2.');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})/, '$1.');
    }

    this.form.get(this.frmName)?.setValue(input, { emitEvent: false });
  }

  onBlur() {
    setTimeout(() => {
      this.onEvent.emit({ event: 'onBlur' });
    }, 200);
  }
}
