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

import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import Car from '../../shared/models/car';
import { ElectronService } from '../../shared/services/electron.service';
import { ToastMessageService } from '../../shared/components/toast/toast.service';
import { PlateInputComponent } from '../../shared/components/plate-input/plate-input.component';
import { OnlyNumbersDirective } from '../../shared/directives/only-numbers.directive';
import { CustomersSelectComponent } from '../../shared/components/customers-select/customers-select.component';
import { ClientInputComponent } from '../../shared/components/customers-input/customers-input.component';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DrawerComponent,
    PlateInputComponent,
    OnlyNumbersDirective,
    CustomersSelectComponent,
    ClientInputComponent,
    InputComponent,
  ],
  selector: 'app-car',
  templateUrl: 'car.component.html',
  styleUrls: ['car.component.scss'],
  providers: [ToastMessageService],
})
export class CarComponent implements OnInit {
  @Input() cars: Car[] = [];
  @Output() onFiltrar: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(DrawerComponent) drawer!: DrawerComponent;

  public headerDrawer = 'Cadastrar Veículo';
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: ElectronService,
    private toast: ToastMessageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group(new Car());
  }

  add() {
    this.form.setValue(new Car());
    this.drawer.openDrawer();
  }

  edit(car: Car) {
    this.form.setValue(car);
    this.drawer.openDrawer();
  }

  async delete(id: number): Promise<void> {
    const car = this.cars.filter((el) => el.id !== id);

    // this.http.addData(car);

    const res = await this.http.saveData('cars', car);

    if (res) {
      this.toast.mostrarSucesso('Carro excluído!');
      this.onFiltrar.emit();
    }
  }

  async fecharDrawer() {
    this.drawer.closeDrawer();
  }

  async salvar() {
    const car: Car = this.form.value;

    const newId = car?.id ? car?.id : this.cars?.length + 1;

    if (car?.id) {
      this.editaCustomer(car);
    } else {
      car.id = newId;
      this.cars.push(car);
    }

    // this.http.addData(this.cars);

    this.http.saveData('cars', this.cars).then((ver) => {
      if (ver) {
        this.drawer.closeDrawer();
        this.onFiltrar.emit();
        this.toast.mostrarSucesso('Carro Salvo!');
      }
    });
  }

  editaCustomer(editCar: Car) {
    this.cars = this.cars.map((el) => {
      if (el.id !== editCar.id) {
        return el;
      }

      return { ...el, ...editCar };
    });
  }
}
