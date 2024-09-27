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
  template: `<div [formGroup]="phoneForm" class="phone-input-container">
    <div class="form-floating">
      <input
        type="text"
        id="phoneNumber"
        class="form-control"
        formControlName="{{ frmPhone }}"
        (input)="formatPhoneNumber($event)"
        placeholder="(99) 99999-9999"
        onlyNumbers
      />
      <label for="phoneNumber">Telefone 2</label>
    </div>

    <div
      *ngIf="
        phoneForm.get(frmPhone)?.invalid && phoneForm.get(frmPhone)?.touched
      "
      class="text-danger"
    >
      Número de telefone inválido. Formato esperado: (99) 99999-9999
    </div>
  </div> `,
})
export class PhoneInputComponent implements OnInit {
  @Input() phoneForm!: FormGroup;
  @Input() frmPhone: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validRequired();
    // this.phoneForm = this.fb.group({
    //   phoneNumber: [
    //     '',
    //     [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)],
    //   ],
    // });
  }

  validRequired() {
    this.phoneForm.controls[this.frmPhone].setValidators([
      Validators.required,
      Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/),
    ]);
  }

  // Função para formatar o número enquanto o usuário digita
  formatPhoneNumber(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 10) {
      input = input.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (input.length > 5) {
      input = input.replace(/^(\d{2})(\d{4})/, '($1) $2-');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})/, '($1) ');
    }

    this.phoneForm.get('phoneNumber')?.setValue(input, { emitEvent: false });
  }

  // Função para lidar com o envio do formulário
  onSubmit(): void {
    if (this.phoneForm.valid) {
      const phoneNumber = this.phoneForm.get('phoneNumber')?.value;
      console.log('Número de telefone válido:', phoneNumber);
    } else {
      console.error('Formulário inválido');
    }
  }
}
