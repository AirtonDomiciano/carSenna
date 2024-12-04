import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts }),
    },
  ],
  template: `
    <div class="card p-3">
      <div echarts [options]="chartOptions" class="echart"></div>
    </div>
  `,
  styles: [
    `
      .echart {
        height: 400px;
      }
    `,
  ],
})
export class BarChartComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Vendas Mensais',
      },
      tooltip: {},
      xAxis: {
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      },
      yAxis: {},
      series: [
        {
          name: 'Vendas',
          type: 'bar',
          data: [39, 56, 104, 89, 45, 28],
        },
      ],
    };
  }
}
