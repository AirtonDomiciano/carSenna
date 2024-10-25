import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { PieChartComponent } from '../../shared/components/chart-pie/chart-pie.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ChartComponent,
    PieChartComponent,
  ],
  selector: 'app-deashboard',
  templateUrl: './deashboard.component.html',
  styleUrl: './deashboard.component.scss',
})
export default class DeashBoardComponent {}
