import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import moment from 'moment';
import { CardInfoComponent } from '../../shared/components/card-info/card-info.component';
import { BarChartComponent } from '../../shared/components/chart-bar/chart-bar.component';
import { PieChartComponent } from '../../shared/components/chart-pie/chart-pie.component';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import NovaOsModel from '../../shared/models/os';
import { ElectronService } from '../../shared/services/electron.service';
import { series } from './dashboard-const';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChartComponent,
    PieChartComponent,
    CardInfoComponent,
    BarChartComponent,
  ],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashBoardComponent implements OnInit {
  @ViewChild('chart') chartComponent!: ChartComponent;
  @ViewChild('chartPie') chartPieComponent!: PieChartComponent;

  public os: NovaOsModel[] = [];
  public dates: Date[] = [];

  public chartValues: number[] = [0, 0, 0, 0, 0, 0, 0];
  public chartColumns: string[] = [];

  public chartPieValues: number[] = [
    209, 10, 29, 324, 22, 75, 55, 76, 43, 67, 87, 53,
  ];
  public chartPieColumns: string[] = [
    'Troca de óleo e filtro',
    'Alinhamento e balanceamento',
    'Revisão dos freios',
    'Substituição de correia dentada',
    'Inspeção e recarga de ar-condicionado',
    'Troca de velas de ignição',
    'Revisão e troca de suspensão',
    'Reparo do sistema de escapamento',
    'Troca de bateria',
    'Inspeção do sistema elétrico',
    'Revisão e limpeza de bicos injetores',
    'Diagnóstico computadorizado',
  ];

  indicadoresFinanceiros = {
    ganhos: 5000,
    gastos: 2000,
    vendas: 6000,
  };

  constructor(private http: ElectronService) {}

  async ngOnInit(): Promise<void> {
    await this.searchOs();
    this.osOfTheYear();
    this.lastSevenDays();
  }

  async searchOs() {
    const os = await this.http.loadData('os');
    if (os?.length) {
      this.os = os;
    }
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
      series({
        receitaValues: [12500, 13400, 14250, 15800, 12000, 13000],
        lucroValues: [4500, 5200, 5000, 6000, 4000, 4800],
      }),
      ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
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
