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
  @ViewChild('chart') chartComponent!: ChartComponent;
  @ViewChild('chartPie') chartPieComponent!: PieChartComponent;

  public os: NovaOsModel[] = [];
  public dates: Date[] = [];

  public chartValues: number[] = [0, 0, 0, 0, 0, 0, 0];
  public chartColumns: string[] = [];

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

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    await this.searchOs();
    this.osOfTheYear();
    this.lastSevenDays();
  }

  async searchOs() {
    this.os = await this.http.loadData('os');
  }

  lastSevenDays() {
    for (let i = 0; i < 7; i++) {
      const date = moment().subtract(i, 'days').startOf('day');
      const day = date.format('ddd');

      this.chartColumns.push(day);
      this.dates.push(date.toDate());
    }

    this.findByDate(this.dates);

    this.chartComponent.setValues(
      this.chartValues.reverse(),
      this.chartColumns.reverse()
    );
  }

  findByDate(dates: Date[]) {
    for (let os of this.os) {
      dates.forEach((date) => {
        if (
          moment(date).format('DD/MM/YYYY') ===
          moment(os.dataEmissao).format('DD/MM/YYYY')
        ) {
          console.log(moment(date).format('DD/MM/YYYY'));
          this.setValues(os);
        }
      });
    }
  }

  setValues(os: NovaOsModel) {
    for (let i = 0; i < this.dates.length; i++) {
      if (
        moment(os.dataEmissao).format('DD/MM/YYYY') ===
        moment(this.dates[i]).format('DD/MM/YYYY')
      ) {
        this.chartValues[i]++;
      }
    }
  }

  osOfTheYear() {
    for (let os of this.os) {
      const month = moment(os.dataEmissao).month();
      this.chartPieValues[month]++;
    }
    this.chartPieComponent.setValues(this.chartPieValues, this.chartPieColumns);
  }
}
