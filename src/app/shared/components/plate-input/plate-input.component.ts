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
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-plate-input',
  template: `<div [formGroup]="plateForm">
    <div class="form-floating">
      <input
        type="text"
        id="plateNumber"
        class="form-control"
        formControlName="{{ frmName }}"
        [ngClass]="{
          'is-invalid':
            plateForm.get(frmName)?.invalid && plateForm.get(frmName)?.touched
        }"
        (input)="formatPlate($event)"
        placeholder="XXX-XXXX"
      />
      <label for="plateNumber">Placa</label>
    </div>

    <div
      *ngIf="plateForm.get(frmName)?.invalid && plateForm.get(frmName)?.touched"
      class="text-danger"
    >
      Placa inválida. Formato esperado: XXX-XXXX
    </div>
  </div> `,
})
export class PlateInputComponent implements OnInit {
  @Input() plateForm!: FormGroup;
  @Input() frmName: string = '';

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    this.plateForm.controls[this.frmName].setValidators([
      Validators.required,
      Validators.pattern(/^([a-zA-Z0-9]{3})([a-zA-Z0-9]{4})/),
    ]);
  }

  formatPlate(event: any): void {
    let input = event.target.value.replace(/[^a-zA-Z0-9-]/g, '');

    if (input.length > 7) {
      input = input.replace(/^([a-zA-Z0-9]{3})([a-zA-Z0-9]{4})/, '$1-$2');
    }

    this.plateForm.get(this.frmName)?.setValue(input, { emitEvent: false });
  }
}
