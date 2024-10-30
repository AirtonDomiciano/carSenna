import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlyNumbersDirective } from '../../directives/only-numbers.directive';
import { CepInputService } from '../../services/cep-input.service';
import { HttpClientModule } from '@angular/common/http';
import { AdressInterface } from '../../interfaces/adress.interface';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OnlyNumbersDirective,
  ],
  selector: 'app-cep-input',
  templateUrl: './cep-input.component.html',
})
export class CepInputComponent {
  @Output() emitterCEP: EventEmitter<any> = new EventEmitter<any>();
  @Input() cepForm!: FormGroup;
  @Input() frmCEP: string = '';
  @Input() findCep: boolean = false;

  constructor(private cepInputService: CepInputService) {}

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    this.cepForm.controls[this.frmCEP].setValidators([
      Validators.required,
      Validators.pattern(/^\d{5}\-\d{3}$/),
    ]);
  }

  formatCEP(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 5) {
      input = input.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }

    this.cepForm.get(this.frmCEP)?.setValue(input, { emitEvent: false });
  }

  loadCEP() {
    const cep = this.cepForm.controls[this.frmCEP].value;
    this.getCEP(cep);
  }

  getCEP(cep: string) {
    this.cepInputService.getAll(cep).subscribe((evt) => {
      this.emitterCEP.emit(evt);
    });
  }
}
