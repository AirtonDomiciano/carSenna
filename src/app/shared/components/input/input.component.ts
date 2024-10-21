import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-input',
  template: `
    <form [formGroup]="formGroup">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          [ngClass]="{
            'is-invalid':
              formGroup.get(nameControl)?.invalid &&
              formGroup.get(nameControl)?.touched
          }"
          placeholder="{{ placeHolder }}"
          formControlName="{{ nameControl }}"
        />
        <label for="name">{{ label }}</label>
      </div>

      <div
        *ngIf="
          formGroup.get(nameControl)?.invalid &&
          formGroup.get(nameControl)?.touched
        "
        class="text-danger"
      >
        <span *ngIf="!formGroup.get(nameControl)?.value">
          {{ label }} Não informado(a).
        </span>
      </div>
    </form>
  `,
})
export class InputComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() nameControl: string = '';
  @Input() label: string = '';
  @Input() placeHolder: string = '';
  @Input() isRequired: boolean = false;

  constructor() {}

  ngOnInit() {}
}
