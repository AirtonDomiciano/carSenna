import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

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
export class PieChartComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  chartOptions: any;

  setValues(values: number[], columns: string[]) {
    const data = this.buildData(values, columns);

    this.chartOptions = {
      title: {
        text: this.title,
        subtext: this.subtitle,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'Notas',
          type: 'pie',
          radius: '50%',
          data: data,
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

    const legendSelected: any = {};
    columns.forEach((column, index) => {
      legendSelected[column] = values[index] > 0;
    });

    this.chartOptions.legend.selected = legendSelected;
  }

  buildData(
    values: number[],
    columns: string[]
  ): Array<{ value: number; name: string }> {
    const data: Array<{ value: number; name: string }> = [];

    for (let i = 0; i < values.length; i++) {
      data.push({ value: values[i], name: columns[i] });
    }
    return data;
  }
}
