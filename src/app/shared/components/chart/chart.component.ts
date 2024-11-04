import { Component, Input } from '@angular/core';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useFactory: () => ({ echarts }), // Aqui você está fornecendo o echarts manualmente
    },
  ],
  template: ` <div echarts [options]="chartOptions" class="echart"></div> `,
  styles: [
    `
      .echart {
        height: 400px;
      }
    `,
  ],
})
export class ChartComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  chartOptions: any;

  setValues(values: number[], columns: string[]) {
    this.chartOptions = {
      title: {
        text: this.title,
        subtext: this.subtitle,
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: columns,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: values,
          type: 'line',
        },
      ],
    };
  }
}
