import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ScreenshotComponent } from '../../shared/components/screenshot/screenshot.component';
import NovaOsModel from '../../shared/models/os';
import TableDataComponent from '../../shared/components/table/table.component';
import { CustomersSelectComponent } from '../../shared/components/customers-select/customers-select.component';
import { itemsNota } from '../../shared/interfaces/items-nota.interface';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { CurrencyInputComponent } from '../../shared/components/currency-input/currency-input';
import { OnlyNumbersDirective } from '../../shared/directives/only-numbers.directive';
import UtilsCurrencyService from '../../shared/utils/utils.currency';
import { CepInputComponent } from '../../shared/components/cep-input/cep-input.component';
import { CarsSelectComponent } from '../../shared/components/cars-select/cars-select.component';
import { ElectronService } from '../../shared/services/electron.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MechanicalsSelectComponent } from '../../shared/components/mechanicals-select/mechanicals-select.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { CnpjInputComponent } from '../../shared/components/cnpj-input/cnpj-input.component';
import { InputComponent } from '../../shared/components/input/input.component';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScreenshotComponent,
    TableDataComponent,
    CustomersSelectComponent,
    CurrencyInputComponent,
    OnlyNumbersDirective,
    CepInputComponent,
    CarsSelectComponent,
    MechanicalsSelectComponent,
    PhoneInputComponent,
    CnpjInputComponent,
    InputComponent,
  ],
  selector: 'app-new-OS',
  templateUrl: 'new-OS.component.html',
  styleUrls: ['new-OS.component.scss'],
  providers: [ToastMessageService],
})
export class NewOSComponent implements OnInit {
  public form!: FormGroup;
  public model: NovaOsModel = new NovaOsModel();
  public itemsNota: itemsNota[] = [];
  public OSs: Array<NovaOsModel> = [];

  constructor(
    private fb: FormBuilder,
    private toast: ToastMessageService,
    private utils: UtilsCurrencyService,
    private http: ElectronService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    this.form = this.fb.group(new NovaOsModel());

    this.form.controls['valueItem'].disable();
  }

  async salvar() {
    this.OSs = await this.http.loadData('os');
    const os: NovaOsModel = this.form.value;

    const newId = os?.id ? os?.id : this.OSs?.length + 1;

    const total = this.itemsNota.reduce(
      (accumulator, value) =>
        accumulator + this.utils.getValor(`${value.value}`),
      0
    );
    os.totalValue = this.utils.formatarValor(total);
    os.itemsNota = this.itemsNota;
    os.id = newId;
    os.dataEmissao = Date();
    this.OSs.push(os);

    this.http.saveData('os', this.OSs).then((ver) => {
      if (ver) {
        this.toast.mostrarSucesso('Nova OS Salva!');
      }
    });
  }

  onCalcTotal() {
    const { amountItem, unitPriceItem } = this.form.value;

    if (!amountItem || !unitPriceItem) {
      this.form.controls['valueItem'].setValue(0);
      return;
    }
    const utilsValueNumber = this.utils.getValor(unitPriceItem);

    const total = amountItem * utilsValueNumber;

    const totalValue = this.utils.formatarValor(total);

    this.form.controls['valueItem'].setValue(`${totalValue}`);
  }

  addItem() {
    const { descriptionItem, amountItem, unitPriceItem } = this.form.value;
    const valueItem = this.form.controls['valueItem'].value;

    if (!descriptionItem) {
      this.toast.mostrarAviso('Descrição do produto não informado.');
      return;
    }

    if (!amountItem) {
      this.toast.mostrarAviso('Quantidade do produto não informado.');
      return;
    }

    if (!unitPriceItem) {
      this.toast.mostrarAviso('Valor do produto não informado.');
      return;
    }

    this.form.controls['descriptionItem'].setValue('');
    this.form.controls['amountItem'].setValue('');
    this.form.controls['valueItem'].setValue('');
    this.form.controls['unitPriceItem'].setValue('');

    this.itemsNota.push({
      description: descriptionItem,
      amount: amountItem,
      unitPrice: unitPriceItem,
      value: valueItem,
    });
  }

  onEventClickBotaoAcoes($event: any) {}

  onSelectMecanico($event: any) {
    this.form.value.mechanical = $event;
    this.form.controls['mechanical'].setValue($event);
  }

  onSelectCliente($event: any) {
    this.form.controls['customer'].setValue($event);
  }

  onSelectCarro($event: any) {
    this.form.controls['car'].setValue($event);
  }

  openModal() {
    this.salvar();

    const obj = this.form.value;
    const modal = this.modal.open(ScreenshotComponent, { size: 'xl' });
    modal.componentInstance.preview = obj;
  }
}
