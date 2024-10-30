import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-plate-input',
  template: `
    <div [formGroup]="plateForm">
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
        *ngIf="
          plateForm.get(frmName)?.invalid && plateForm.get(frmName)?.touched
        "
        class="text-danger"
      >
        Placa inválida. Formato esperado: XXX-XXXX
      </div>
    </div>
  `,
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
      Validators.pattern(/^([A-Z0-9]{3}-[A-Z0-9]{4})$/i),
    ]);
  }

  formatPlate(event: any): void {
    let input = event.target.value.replace(/[^A-Za-z0-9]/g, '');

    input =
      input.length > 3 ? `${input.slice(0, 3)}-${input.slice(3, 7)}` : input;

    this.plateForm.get(this.frmName)?.setValue(input, { emitEvent: false });
  }
}
