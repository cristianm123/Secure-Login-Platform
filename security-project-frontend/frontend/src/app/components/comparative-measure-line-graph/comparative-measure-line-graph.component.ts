import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConsumptionUnitDto} from "../../models/consumption-unit-dto";
import {Observable} from "rxjs";
import {filter, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-comparative-measure-line-graph',
  templateUrl: './comparative-measure-line-graph.component.html',
  styleUrls: ['./comparative-measure-line-graph.component.scss']
})
export class ComparativeMeasureLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() defaultPeriod: string;
  @Input() firstMeasureData$: Observable<ConsumptionUnitDto[]>;
  @Input() SecondMeasureData$: Observable<ConsumptionUnitDto[]>;
  @Input() firstMeasure: string;
  @Input() firstUnits: string;
  @Input() secondMeasure: string;
  @Input() secondUnits: string;

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  options: any;
  loading: boolean;
  firstMeasureData: ConsumptionUnitDto[];
  secondMeasureData: ConsumptionUnitDto[];

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.firstMeasureData$
      .pipe(
        filter((data) => !!data),
        tap((data) => this.firstMeasureData = data),
        switchMap(() => this.SecondMeasureData$),
        filter((data) => !!data),
        tap((data) => this.secondMeasureData = data),
        tap(() => this.generateOptions())
      )
      .subscribe();
  }

  generateOptions() {
    this.options = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data:[this.firstMeasure, this.secondMeasure]
      },
      grid: {
        top: 70,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisLabel: {
            formatter: '',
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgba(52, 103, 255, 1)',
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Fecha: ' + params.value
                  + (params.seriesData.length ? ' Consumo: ' + params.seriesData[0].data : '');
              }            }
          },
          data: this.secondMeasureData.map((item) => item.dateConsumption
          )
        },
        {
          type: 'category',
          axisLabel: {
            formatter: '',
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: 'rgb(5, 216, 145)',
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Fecha: ' + params.value
                  + (params.seriesData.length ? ' Consumo: ' + params.seriesData[0].data : '');
              }            }
          },
          data: this.firstMeasureData.map((item) => item.dateConsumption)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: this.secondMeasure,
          type: 'line',
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.secondMeasureData.map((value) => value.consumptionUnits)
        },
        {
          name: this.firstMeasure,
          type: 'line',
          xAxisIndex: 1,
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.firstMeasureData.map((value) => value.consumptionUnits)
        }
      ]
    };
    this.loading = false;
  }

  onDateChange(dates: Date[]): void {
    this.dateEmitter.emit(dates);
  }
}
