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
      useFactory: () => ({ echarts }),
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
export class PieChartComponent {
  chartOptions: any;

  setValues(values: number[], columns: string[]) {
    const arrayTest = this.buildArrayObject(values, columns);

    this.chartOptions = {
      title: {
        text: 'Notas do ano',
        subtext: 'Dados Fictícios',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Notas',
          type: 'pie',
          radius: '50%',
          data: arrayTest,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  buildArrayObject(
    values: number[],
    columns: string[]
  ): Array<{ value: number; name: string }> {
    const array: Array<{ value: number; name: string }> = [];

    for (let i = 0; i <= values.length; i++) {
      if (values[i] > 0) {
        array.push({ value: values[i], name: columns[i] });
      }
    }
    return array;
  }
}
