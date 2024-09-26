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

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DrawerComponent],
  selector: 'app-car',
  templateUrl: 'car.component.html',
  styleUrls: ['car.component.scss'],
  providers: [ToastMessageService],
})
export class CarComponent implements OnInit {
  @Input() cars: Car[] = [];
  @Output() onFiltrar: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(DrawerComponent) drawer!: DrawerComponent;

  public headerDrawer = 'Cadastrar Carro';
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
    this.drawer.openDrawer();
  }

  edit(customer: Car) {
    this.form.setValue(customer);
    this.drawer.openDrawer();
  }

  async delete(id: number): Promise<void> {}

  async salvar() {}

  async fecharDrawer() {
    this.drawer.closeDrawer();
  }
}
