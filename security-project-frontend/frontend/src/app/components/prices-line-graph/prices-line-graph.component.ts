import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { FilterService } from "../../services/filter.service";
import {ExchangeDto} from "../../models/exchange-dto";

@Component({
  selector: 'app-prices-line-graph',
  templateUrl: './prices-line-graph.component.html',
  styleUrls: ['./prices-line-graph.component.scss']
})
export class PricesLineGraphComponent implements OnInit {

  @Input() theme: string;
  @Input() data$: Observable<ExchangeDto[]>;
  @Input() measure: string;
  @Input() units: string;

  @Output() dateEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  options: any;
  loading: boolean;
  data: ExchangeDto[];

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
        data: this.data.map(value => value.dateExchange)
      },
      yAxis: {
        type: 'value',
        min: this.filterService.getMinValueOfPrices(this.data).exchangeUnits,
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
          data: this.data.map(value => value.exchangeUnits),
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
