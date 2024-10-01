import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ElectronService } from '../../shared/services/electron.service';
import Customer from '../../shared/models/customer';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { CpfInputComponent } from '../../shared/components/cpf-input/cpf-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerComponent,
    PhoneInputComponent,
    CpfInputComponent
  ],
  selector: 'app-customer',
  templateUrl: 'customer.component.html',
  providers: [ToastMessageService],
})
export class CustomerComponent implements OnInit {
  @Input() customers: Customer[] = [];
  @Output() onFiltrar: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(DrawerComponent) drawer!: DrawerComponent;

  public form!: FormGroup;
  public headerDrawer: string = 'Cadastrar cliente';

  constructor(
    private fb: FormBuilder,
    private http: ElectronService,
    private toast: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(new Customer());
  }

  add() {
    this.form.setValue(new Customer());
    this.drawer.openDrawer();
  }

  edit(customer: Customer) {
    this.form.setValue(customer);
    this.drawer.openDrawer();
  }

  async delete(id: number): Promise<void> {
    const customers = this.customers.filter((el) => el.id !== id);

    // this.http.addData(customers);

    const res = await this.http.saveData('customers', customers);

    if (res) {
      this.toast.mostrarSucesso('Cliente excluído!');
      this.onFiltrar.emit();
    }
  }

  onGetCep() {
      this.toast.mostrarAviso('Não foi possível buscar as informações do cep')
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }

  async salvar() {
    this.salvarCustomers();

    this.http.saveData('customers', this.customers).then((ver) => {
      if (ver) {
        this.drawer.closeDrawer();
        this.onFiltrar.emit();
        this.toast.mostrarSucesso('Cliente Salvo!');
      }
    });
  }

  async salvarCustomers(): Promise<void> {
    const customer: Customer = this.form.value;

    const newId = customer?.id ? customer?.id : this.customers?.length + 1;

    if (!this.customers?.length) {
      this.customers = [];
    }

    if (customer?.id) {
      this.editaCustomer(customer);
    } else {
      customer.id = newId;
      this.customers.push(customer);
    }

    // this.http.addData(this.customers);
  }

  editaCustomer(editCustomer: Customer) {
    for (const customer of this.customers) {
      if (customer.id !== editCustomer.id) {
        continue;
      }

      customer.name = editCustomer.name;
      customer.cpf = editCustomer.cpf;
      customer.telephone = editCustomer.telephone;
      customer.email = editCustomer.email;
    }
  }
}
