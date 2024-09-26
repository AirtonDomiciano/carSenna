import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import TableDataComponent from '../../shared/components/table/table.component';
import { CarComponent } from '../car/car.component';
import Car from '../../shared/models/car';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableDataComponent,
    CarComponent,
  ],
  selector: 'app-cars',
  templateUrl: 'cars.component.html',
  styleUrls: ['cars.component.scss'],
})
export class CarsComponent implements OnInit {
  public cars: Car[] = [];
  @ViewChild(CarComponent) car!: CarComponent;

  constructor() {}

  ngOnInit() {}

  onEventClickBotaoAcoes($event: any) {
    switch ($event.id) {
      case 'id-edit':
        this.car.edit($event.obj);
        break;
      case 'id-trash':
        this.car.delete($event.obj);
        break;
      default:
        break;
    }
  }

  add() {
    this.car.add();
  }
}
