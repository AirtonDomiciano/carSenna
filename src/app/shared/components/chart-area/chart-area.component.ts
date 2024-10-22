import { Component } from '@angular/core';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-area-chart',
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
export class AreaChartComponent {
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      title: {
        text: 'Variação de Preços ao Longo do Tempo'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Preço',
          type: 'line',
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  }
}
