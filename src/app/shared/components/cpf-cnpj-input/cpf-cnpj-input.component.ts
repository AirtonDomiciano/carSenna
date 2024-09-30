import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  selector: 'app-cpf-cnpj-input',
  templateUrl: './cpf-cnpj-input.component.html',
})
export class CpfCnpjInputComponent {
  @Input() cpfCnpjForm!: FormGroup;
  @Input() frmName: string = '';
}
