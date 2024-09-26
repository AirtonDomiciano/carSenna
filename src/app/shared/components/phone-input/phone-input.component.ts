import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
})
export class PhoneInputComponent implements OnInit {
  @Input() phoneForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{5}-\d{4}$/)],
      ],
    });
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
