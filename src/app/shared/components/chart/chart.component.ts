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
  template: `
    <div class="card p-3">
      <!-- Botões de Ações -->
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-secondary btn-sm d-flex align-items-center">
          <i class="bi bi-calendar3 me-2"></i> Este mês
        </button>
        <button class="btn btn-primary btn-sm ms-auto">
          <i class="bi bi-bar-chart"></i>
        </button>
      </div>

      <!-- Dados e Gráfico -->
      <div class="d-flex flex-column flex-lg-row mt-3">
        <div class="me-lg-3">
          <h3 class="fw-bold">R$37.5K</h3>
          <div class="d-flex align-items-center mb-2">
            <span class="text-muted me-2">Total Gasto</span>
            <i class="bi bi-arrow-up-circle success-text me-1"></i>
            <span class="success-text fw-bold">+2.45%</span>
          </div>

          <div class="d-flex align-items-center success-text">
            <i class="bi bi-check-circle me-2"></i>
            <span class="fw-bold">No caminho certo</span>
          </div>
        </div>

        <!-- Gráfico -->
        <div class="mt-lg-0 flex-grow-1">
          <div echarts [options]="chartOptions" class="echart"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        background-color: var(--bs-card-bg);
        color: var(--bs-body-color);
        border-radius: 0.5rem;

        border-color: var(--chakra-colors-chakra-border-color) !important;
        border-radius: 20px !important;
      }

      .success-text {
        color: var(--green-500);
      }
    `,
  ],
})
export class ChartComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  public chartOptions: echarts.EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev'],
      axisLabel: {
        color: '#A3AED0',
        fontSize: 12,
        fontWeight: 'bold',
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      show: false,
    },
    series: [],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#333',
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      top: '10%',
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true,
    },
    legend: {
      show: false,
    },
  };

  // TODO XAXIS RECEBER A LISTA DE LABELS DE RODAPÉ
  setValues(series: echarts.SeriesOption[], xAxisData: string[]) {
    this.chartOptions.series = series;
    /* this.chartOptions.xAxis = {
      ...this.chartOptions.xAxis,
      data: ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev',],
    }; */
  }
}
