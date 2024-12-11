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
  selector: 'app-phone-input',
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
        (input)="formatPhoneNumber($event)"
        placeholder="(99) 99999-9999"
        onlyNumbers
        maxlength="15"
      />
      <label for="phoneNumber">Telefone</label>
    </div>

    <div
      *ngIf="form.get(frmName)?.invalid && form.get(frmName)?.touched"
      class="text-danger"
    >
      telefone inválido. Formato esperado: (99) 99999-9999 | (99) 9999-9999
    </div>
  </div> `,
})
export class PhoneInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() isRequired: boolean = false;

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    const validators = [
      Validators.pattern(/^\(?\d{2}\)?\s?(?:9?\d{4})-?\d{4}$/),
    ];

    if (this.isRequired) {
      validators.push(Validators.required);
    }

    this.form.controls[this.frmName].setValidators(validators);
  }

  formatPhoneNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 10) {
      input = input.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (input.length === 6) {
      input = input.replace(/^(\d{2})(\d{4})/, '($1) $2');
    } else if (input.length > 5) {
      input = input.replace(/^(\d{2})(\d{4})/, '($1) $2-');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})/, '($1) ');
    }

    this.form.get(this.frmName)?.setValue(input, { emitEvent: false });
  }
}
