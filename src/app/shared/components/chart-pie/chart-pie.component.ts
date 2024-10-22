import { Component } from '@angular/core';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-pie-chart',
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
export class PieChartComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Participação de Mercado',
        subtext: 'Dados Fictícios',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Participação',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Google' },
            { value: 735, name: 'Apple' },
            { value: 580, name: 'Microsoft' },
            { value: 484, name: 'Amazon' },
            { value: 300, name: 'Facebook' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
