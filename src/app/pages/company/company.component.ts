import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CompanyModel } from './company.model';
import { InputComponent } from '../../shared/components/input/input.component';
import { CnpjInputComponent } from '../../shared/components/cnpj-input/cnpj-input.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { CurrencyInputComponent } from '../../shared/components/currency-input/currency-input';
import { ICompEvent } from '../../shared/interfaces/comp-event.interface';
import { SelRegime } from './company.const';
import { InputSelectComponent } from '../../shared/components/input-select/input-select.component';
import { ElectronService } from '../../shared/services/electron.service';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    CnpjInputComponent,
    PhoneInputComponent,
    CurrencyInputComponent,
    InputSelectComponent,
  ],
  providers: [ToastMessageService],
  selector: 'app-company',
  templateUrl: 'company.component.html',
})
export class CompanyComponent implements OnInit {
  public form!: FormGroup;

  model: CompanyModel;

  selRegime = SelRegime;

  constructor(
    private fb: FormBuilder,
    private http: ElectronService,
    private toast: ToastMessageService
  ) {
    this.model = new CompanyModel();
    this.form = this.fb.group(this.model);
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const data: CompanyModel = await this.http.loadData('config');
    this.form.setValue(data);
  }

  consultarCnpj(event: ICompEvent<null>) {
    if (event.event !== 'onBlur') {
      return;
    }
    const cnpj = this.form.controls['cnpj'].value;

    if (cnpj.length === 14) {
      console.log('Consultar cnpjg');
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.mostrarAviso(
        'Você deve informar todos os campos obrigatórios antes de continuar.'
      );
      return;
    }

    this.http.saveData('config', this.form.value).then((res) => {
      if (res) {
        this.toast.mostrarSucesso('Configurações salvas com sucesso!');
      }
    });
  }
}
