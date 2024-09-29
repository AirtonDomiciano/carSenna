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
  // public preview: NovaOsModel = new NovaOsModel()

  constructor(
    private fb: FormBuilder,
    private toast: ToastMessageService,
    private utils: UtilsCurrencyService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(new NovaOsModel());

    this.form.controls['valueItem'].disable();
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
}
