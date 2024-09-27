import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'lib-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  // Pie chart configuration
  // public pieChartOptions: ChartOptions<'pie'> = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (tooltipItem) {
  //           return tooltipItem.label + ': ' + tooltipItem.raw + '%';
  //         }
  //       }
  //     }
  //   }
  // };
  //
  // // Data for the pie chart
  // public pieChartData: ChartConfiguration<'pie'>['data'] = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [{
  //     data: [30, 20, 15, 10, 15, 10],
  //     backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40']
  //   }]
  // };
}

