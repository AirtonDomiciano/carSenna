import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { CurrencyInputComponent } from '../../shared/components/currency-input/currency-input';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { InputSelectComponent } from '../../shared/components/input-select/input-select.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import Product from '../../shared/models/products';
import { ElectronService } from '../../shared/services/electron.service';
import { SelTipoProduto } from './product.const';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerComponent,
    InputComponent,
    CurrencyInputComponent,
    InputSelectComponent,
  ],
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
  providers: [ToastMessageService],
})
export class ProductComponent implements OnInit {
  @Input() product: Product[] = [];
  @Output() onFiltrar: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(DrawerComponent) drawer!: DrawerComponent;

  public headerDrawer = 'Cadastrar Produto';
  public form!: FormGroup;

  selTipoProduto = SelTipoProduto;

  constructor(
    private fb: FormBuilder,
    private http: ElectronService,
    private toast: ToastMessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(new Product());
  }

  add() {
    this.form.setValue(new Product());
    this.drawer.openDrawer();
  }

  edit(obj: Product) {
    this.form.setValue(obj);
    this.drawer.openDrawer();
  }

  async delete(idProducts: number): Promise<void> {
    const products = this.product.filter((el) => el.idProducts !== idProducts);

    const res = await this.http.saveData('products', products);

    if (res) {
      this.toast.mostrarSucesso('Carro excluído!');
      this.onFiltrar.emit();
    }
  }

  async fecharDrawer() {
    this.drawer.closeDrawer();
  }

  async salvar() {
    const product: Product = this.form.value;

    const newId = product?.idProducts
      ? product?.idProducts
      : this.product?.length + 1;

    if (product?.idProducts) {
      this.edita(product);
    } else {
      product.idProducts = newId;
      this.product.push(product);
    }

    this.http.saveData('products', this.product).then((ver) => {
      if (ver) {
        this.drawer.closeDrawer();
        this.onFiltrar.emit();
        this.toast.mostrarSucesso('Produto Salvo!');
      }
    });
  }

  edita(obj: Product) {
    this.product = this.product.map((el) => {
      if (el.idProducts !== obj.idProducts) {
        return el;
      }

      return { ...el, ...obj };
    });
  }
}
