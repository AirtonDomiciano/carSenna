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
  selector: 'app-phone-input',
  template: `<div [formGroup]="phoneForm">
    <div class="form-floating">
      <input
        type="text"
        id="phoneNumber"
        class="form-control"
        formControlName="{{ frmPhone }}"
        [ngClass]="{
          'is-invalid':
            phoneForm.get(frmPhone)?.invalid && phoneForm.get(frmPhone)?.touched
        }"
        (input)="formatPhoneNumber($event)"
        placeholder="(99) 99999-9999"
        onlyNumbers
      />
      <label for="phoneNumber">Telefone</label>
    </div>

    <div
      *ngIf="
        phoneForm.get(frmPhone)?.invalid && phoneForm.get(frmPhone)?.touched
      "
      class="text-danger"
    >
      telefone inválido. Formato esperado: (99) 99999-9999
    </div>
  </div> `,
})
export class PhoneInputComponent implements OnInit {
  @Input() phoneForm!: FormGroup;
  @Input() frmPhone: string = '';
  @Input() isRequired: boolean = false;

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    const validators = [
      Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)
    ];


    if (this.isRequired) {
      validators.push(Validators.required);
    }

    this.phoneForm.controls[this.frmPhone].setValidators(validators);
  }

  formatPhoneNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 10) {
      input = input.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (input.length > 5) {
      input = input.replace(/^(\d{2})(\d{4})/, '($1) $2-');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})/, '($1) ');
    }

    this.phoneForm.get(this.frmPhone)?.setValue(input, { emitEvent: false });
  }
}
