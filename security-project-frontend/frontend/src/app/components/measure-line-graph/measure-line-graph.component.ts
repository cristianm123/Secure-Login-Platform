import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { FilterService } from "../../services/filter.service";

@Component({
  selector: 'app-measure-line-graph',
  templateUrl: './measure-line-graph.component.html',
  styleUrls: ['./measure-line-graph.component.scss']
})
export class MeasureLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() data$: Observable<ConsumptionUnitDto[]>;
  @Input() measure: string;
  @Input() units: string;

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  options: any;
  loading: boolean;
  data: ConsumptionUnitDto[];

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.data$
      .pipe(
        filter((data) => !!data),
        tap((data) => this.data = data),
        tap(() => this.generateOptions())
      )
      .subscribe();
  }

  generateOptions() {
    this.options = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        formatter: 'Fecha: {b}  <br/> Consumo {c}' +(this.units || ''),
        axisPointer: {
          type: 'cross'
        }
      },
      toolbox: {
        show: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          formatter: '',
        },
        boundaryGap: true,
        data: this.data.map(value => value.dateConsumption)
      },
      yAxis: {
        type: 'value',
        min: this.filterService.getMinValueOfConsumption(this.data).consumptionUnits,
        axisLabel: {
          formatter: '{value}' +(this.units || '')
        },
        axisPointer: {
          snap: true
        }
      },
      visualMap: {
        show: false,
        dimension: 0,
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: this.data.map(value => value.consumptionUnits),
          lineStyle: {
            color: 'rgb(5, 216, 145)',
            width: 2,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8
          },
        }
      ]
    };
    this.loading = false;
  }

  onDateChange(dates: Date[]): void {
    this.dateEmitter.emit(dates);
  }
}
