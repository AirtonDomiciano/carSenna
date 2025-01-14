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
  @Input() form!: FormGroup;
  @Input() frmName: string = '';
  @Input() findCep: boolean = false;
  @Input() isRequired: boolean = false;


  constructor(private cepInputService: CepInputService) {}

  ngOnInit(): void {
    this.validRequired();
  }

  validRequired() {
    const validators = [
      Validators.pattern(/^\d{5}\-\d{3}$/),  
    ]

    if (this.isRequired) {
      validators.push(Validators.required);
    }
    
    this.form.controls[this.frmName].setValidators(validators);
  }

  formatCEP(event: any): void {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 5) {
      input = input.replace(/^(\d{5})(\d{0,3})/, '$1-$2');
    }

    this.form.get(this.frmName)?.setValue(input, { emitEvent: false });
  }

  loadCEP() {
    const cep = this.form.controls[this.frmName].value;
    this.getCEP(cep);
  }

  getCEP(cep: string) {
    this.cepInputService.getAll(cep).subscribe((evt) => {
      this.emitterCEP.emit(evt);
    });
  }
}
