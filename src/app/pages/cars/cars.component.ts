import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import TableDataComponent from '../../shared/components/table/table.component';
import { CarComponent } from '../car/car.component';
import Car from '../../shared/models/car';
import { ElectronService } from '../../shared/services/electron.service';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableDataComponent,
    CarComponent,
    SearchComponent,
  ],
  selector: 'app-cars',
  templateUrl: 'cars.component.html',
  styleUrls: ['cars.component.scss'],
})
export class CarsComponent implements OnInit {
  public cars: Car[] = [];
  @ViewChild(CarComponent) car!: CarComponent;

  constructor(private http: ElectronService) {}

  ngOnInit() {
    this.loadData();
    // this.http.addTypeData('cars');
  }

  async loadData(cars?: any) {
    if (cars) {
      this.cars = cars;
    } else {
      this.cars = [];

      const res: Car[] = await this.http.loadData('cars');
      if (res?.length > 0) {
        this.cars = res;
      }
    }
  }

  add() {
    this.car.add();
  }

  onEventClickBotaoAcoes($event: any) {
    switch ($event.id) {
      case 'id-edit':
        this.car.edit($event.obj);
        break;
      case 'id-trash':
        this.car.delete($event.obj.id);
        break;
      default:
        break;
    }
  }
}
