import { Component } from '@angular/core';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts })
    }
  ],
  template: `
    <div echarts [options]="chartOptions" class="echart"></div>
  `,
  styles: [`
    .echart { height: 400px; }
  `]
})
export class RadarChartComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Avaliação de Habilidades'
      },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Desenvolvimento', max: 6500 },
          { name: 'Comunicação', max: 16000 },
          { name: 'Design', max: 30000 },
          { name: 'Marketing', max: 38000 },
          { name: 'Gerenciamento', max: 52000 }
        ]
      },
      series: [{
        name: 'Habilidades',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000],
            name: 'Pessoa A'
          }
        ]
      }]
    };
  }
}
