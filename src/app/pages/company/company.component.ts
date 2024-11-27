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
import { SelAmbiente, SelRegime } from './company.const';
import { InputSelectComponent } from '../../shared/components/input-select/input-select.component';
import { ElectronService } from '../../shared/services/electron.service';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { CommonModule } from '@angular/common';
import { UFS } from '../../shared/const';

import { ConsultaCnpjService } from '../../shared/services/consulta-cnpj.service';

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
  selAmbiente = SelAmbiente;
  selUF = UFS;

  constructor(
    private fb: FormBuilder,
    private http: ElectronService,
    private toast: ToastMessageService,
    private consultaCnpjService: ConsultaCnpjService
  ) {
    this.model = new CompanyModel();
    this.form = this.fb.group(this.model);
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const data: CompanyModel = await this.http.loadData('config');
    if (data?.razaoSocial) {
      this.form.setValue(data);
    }
  }

  consultarCnpj(event: ICompEvent<null>) {
    if (event.event !== 'onBlur') {
      return;
    }
    const cnpj = this.form.controls['cnpj'].value?.replace(/\D/g, '');

    if (cnpj.length === 14) {
      this.consultar(cnpj);
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

  async consultar(cnpj: string) {
    const data = await this.consultaCnpjService.consultar(cnpj);

    const uf = this.selUF.find(
      (el) => el.name.toUpperCase() === data.uf.toUpperCase()
    );

    this.form.controls['uf'].setValue(uf?.id);
    this.form.controls['razaoSocial'].setValue(data.nome);
    this.form.controls['nomeFantasia'].setValue(data.fantasia);
    this.form.controls['cnae'].setValue(data.atividade_principal[0].code);
    this.form.controls['logradouro'].setValue(data.logradouro);
    this.form.controls['numero'].setValue(data.numero);
    this.form.controls['complemento'].setValue(data.complemento);
    this.form.controls['bairro'].setValue(data.bairro);
    this.form.controls['municipio'].setValue(data.municipio);
    this.form.controls['cep'].setValue(data.cep);
    this.form.controls['telefone'].setValue(data.telefone);
    this.form.controls['email'].setValue(data.email);
  }
}
