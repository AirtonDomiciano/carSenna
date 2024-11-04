import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { PieChartComponent } from '../../shared/components/chart-pie/chart-pie.component';
import moment from 'moment';
import { ElectronService } from '../../shared/services/electron.service';
import NovaOsModel from '../../shared/models/os';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChartComponent,
    PieChartComponent,
  ],
  selector: 'app-deashboard',
  templateUrl: './deashboard.component.html',
  styleUrl: './deashboard.component.scss',
})
export default class DeashBoardComponent implements OnInit {
  @ViewChild('chartPie') chartPieComponent!: PieChartComponent;

  public os: NovaOsModel[] = [];
  public chartPieValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public chartPieColumns: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  // public chartColumns: string[] = [];
  // public chartValues: number[] = [];

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    await this.searchOs();
    this.osOfTheYear();
    // this.lastSevenDays();
  }

  async searchOs() {
    this.os = await this.http.loadData('os');
  }

  // lastSevenDays() {
  //   const dates: Date[] = [];
  //   for (let i = 0; i < 7; i++) {
  //     const date = moment().subtract(i, 'days').startOf('day');
  //     const day = date.format('ddd');

  //     this.chartColumns.push(day);
  //     dates.push(date.toDate());
  //   }
  // }

  osOfTheYear() {
    for (let os of this.os) {
      const month = moment(os.dataEmissao).month();
      this.chartPieValues[month]++;
    }
    this.chartPieComponent.setValues(this.chartPieValues, this.chartPieColumns);
  }
}
