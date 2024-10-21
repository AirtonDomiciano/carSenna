import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import registeredCompany from '../../shared/models/registered-company';
import { CnpjInputComponent } from '../../shared/components/cnpj-input/cnpj-input.component';
import { ElectronService } from '../../shared/services/electron.service';
import { TypeWriterComponent } from '../../shared/components/type-writer/type-writer.component';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CnpjInputComponent,
    TypeWriterComponent,
    InputComponent
  ],
  selector: 'app-registered-company',
  templateUrl: 'registered-company.component.html',
  styleUrls: ['./registered-company.component.scss'],
  providers: [ToastMessageService],
})
export class RegisteredCompanyComponent implements OnInit {
  model: registeredCompany = new registeredCompany();

  @Output() onRegistred: EventEmitter<boolean> = new EventEmitter<boolean>();
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: ElectronService,
    private toast: ToastMessageService) {}

  ngOnInit() {
    this.form = this.fb.group(this.model);

    this.form.controls['name'].setValidators([Validators.required]);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();  
      this.toast.mostrarAviso('Você deve informar todos os campos obrigatórios antes de continuar.')
      return;
    }

    this.http.saveData('config', this.form.value).then((res) => {
      if (res) {
        this.onRegistred.emit(res);
      }
    });
  }
}
