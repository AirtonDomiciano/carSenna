import { Component } from '@angular/core';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar-chart',
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
export class BarChartComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Vendas Mensais'
      },
      tooltip: {},
      xAxis: {
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {},
      series: [{
        name: 'Vendas',
        type: 'bar',
        data: [500, 200, 360, 1000, 800, 400]
      }]
    };
  }
}
