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
import { CepInputComponent } from '../../shared/components/cep-input/cep-input.component';
import { CpfInputComponent } from '../../shared/components/cpf-input/cpf-input.component';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { AdressInterface } from '../../shared/interfaces/adress.interface';
import Customer from '../../shared/models/customer';
import { ElectronService } from '../../shared/services/electron.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerComponent,
    PhoneInputComponent,
    CpfInputComponent,
    CepInputComponent,
    InputComponent,
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
  public cepReadOnly: boolean = false;

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

  closeDrawer() {
    this.drawer.closeDrawer();
  }

  async salvar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();  
      this.toast.mostrarAviso('Você deve informar todos os campos obrigatórios antes de continuar.')
      return;
    }

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
    // TODO Mudar 
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

  setarEndereco(obj: AdressInterface) {
    this.form.controls['cidade'].setValue(obj.localidade);
    this.form.controls['bairro'].setValue(obj.bairro);
    this.form.controls['rua'].setValue(obj.logradouro);
    this.form.controls['estado'].setValue(obj.uf);
    if (obj.localidade) {
      this.cepReadOnly = true;
    }
  }
}
