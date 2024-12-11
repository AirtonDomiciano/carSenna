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
  selector: 'app-input',
  template: `
    <form [formGroup]="form">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          [ngClass]="{
            'is-invalid':
              form.get(frmName)?.invalid && form.get(frmName)?.touched
          }"
          placeholder="{{ placeHolder }}"
          formControlName="{{ frmName }}"
          [readOnly]="readOnly"
          [attr.maxLength]="maxLength"
        />
        <label for="name">{{ label }}</label>
      </div>

      <div
        *ngIf="form.get(frmName)?.invalid && form.get(frmName)?.touched"
        class="text-danger"
      >
        <span *ngIf="!form.get(frmName)?.value">
          {{ label }} não informado(a).
        </span>
      </div>
    </form>
  `,
})
export class InputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() label: string = '';
  @Input() placeHolder: string = '';
  @Input() isRequired: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() maxLength?: string;

  constructor() {}

  ngOnInit() {
    this.validRequired();
  }

  validRequired() {
    if (this.isRequired) {
      this.form.controls[this.frmName].setValidators([Validators.required]);
    }
  }

  teste() {
    console.log(this.form.controls[this.frmName].invalid);
  }
}
