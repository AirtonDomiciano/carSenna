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

import { CpfInputComponent } from '../../shared/components/cpf-input/cpf-input.component';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import Mechanical from '../../shared/models/mechanical';
import { ElectronService } from '../../shared/services/electron.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerComponent,
    InputComponent,
    PhoneInputComponent,
    CpfInputComponent,
  ],
  selector: 'app-mechanical',
  templateUrl: 'mechanical.component.html',
  styleUrls: ['mechanical.component.scss'],
  providers: [ToastMessageService],
})
export class MechanicalComponent implements OnInit {
  @Input() mechanicals: Mechanical[] = [];
  @Output() onFiltrar: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(DrawerComponent) drawer!: DrawerComponent;

  public headerDrawer = 'Cadastrar Mecanico';
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: ElectronService,
    private toast: ToastMessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(new Mechanical());
  }

  add() {
    this.form.setValue(new Mechanical());
    this.drawer.openDrawer();
  }

  edit(mechanical: Mechanical) {
    this.form.setValue(mechanical);
    this.drawer.openDrawer();
  }

  async delete(id: number): Promise<void> {
    const mechanical = this.mechanicals.filter((el) => el.id !== id);

    // this.http.addData(mechanical);

    const res = await this.http.saveData('mechanicals', this.mechanicals);

    if (res) {
      this.toast.mostrarSucesso('Mecânico excluído!');
      this.onFiltrar.emit();
    }
  }

  async fecharDrawer() {
    this.drawer.closeDrawer();
  }

  async salvar() {
    const mechanical: Mechanical = this.form.value;


    if (this.form.invalid) {
      this.form.markAllAsTouched();  
      this.toast.mostrarAviso('Você deve informar todos os campos obrigatórios antes de continuar.')
      return;
    }
    
    const newId = mechanical?.id
      ? mechanical?.id
      : this.mechanicals?.length + 1;

    if (mechanical?.id) {
      this.editaCustomer(mechanical);
    } else {
      mechanical.id = newId;
      this.mechanicals.push(mechanical);
    }

    this.http.saveData('mechanicals', this.mechanicals).then((ver) => {
      if (ver) {
        this.drawer.closeDrawer();
        this.onFiltrar.emit();
        this.toast.mostrarSucesso('Mecânico Salvo!');
      }
    });
  }

  editaCustomer(editCustomer: Mechanical) {
    for (const customer of this.mechanicals) {
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
