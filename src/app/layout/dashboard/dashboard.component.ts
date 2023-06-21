import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';
import * as Chartist from 'chartist';
import { BarChart, LineChart } from 'chartist';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  statistic$!: Observable<any>;
  userId: any = sessionStorage.getItem('UID');

  constructor(private _ticketService: TicketService) {
    this.statistic$ = this._ticketService.statistic(this.userId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    new LineChart(
      '#chart',
      {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
        series: [
          [1, 2, 4, 8, 6, -2, -1, -4, -6, -2],
          [-5, 1, 6, 8, 6, 3, 5, -1, -2, 0],
          [-10, -5, -3, 0, 5, 8, 6, 3, 2, -1],
        ],
      },
      {
        high: 10,
        low: -10,
        axisX: {
          labelInterpolationFnc: (value, index) =>
            index % 2 === 0 ? value : null,
        },
      }
    );

    new BarChart(
      '#chart2',
      {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
          [5, 4, 3, 7, 5, 10, 3],
          [3, 2, 9, 5, 4, 6, 4],
          [10, 6, 3, 1, 2, 5, 4],
        ],
      },
      {
        axisX: {
          // On the x-axis start means top and end means bottom
          position: 'start',
        },
        axisY: {
          // On the y-axis start means left and end means right
          position: 'end',
        },
      }
    );
  }
}
