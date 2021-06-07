import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import {filter, first, switchMap, tap} from "rxjs/operators";
import { BehaviorSubject, combineLatest } from "rxjs";
import { DataSelectorService } from "../../services/data-selector.service";
import { ConsumptionService } from 'src/app/services/consumption.service';
import { ConsumptionUnitDto } from "../../models/consumption-unit-dto";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  theme: string;
  contractId: string;
  loading: boolean;
  activeDataClock: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
  activeDataGraphic: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
  reactiveDataClock: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);
  reactiveDataGraphic: BehaviorSubject<ConsumptionUnitDto[]> = new BehaviorSubject<ConsumptionUnitDto[]>(null);

  constructor(
    private themeService: ThemeService,
    private dataSelectorService: DataSelectorService,
    private consumptionService: ConsumptionService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getData();
  }

  getData(): void {
    combineLatest([
      this.themeService.getTheme$()
        .pipe(
          tap((theme) => this.theme = theme),
        ),
      this.dataSelectorService.getContract$()
        .pipe(
          filter((value) => !!value),
          tap((value) => this.contractId = value),
          tap(() => this.loading = true),
          switchMap((value) => combineLatest([
            this.consumptionService.getData(value, 'active'),
            this.consumptionService.getData(value, 'reactive'),
          ])
            .pipe(
              tap(([active, reactive]) => {
                this.activeDataClock.next(active);
                this.reactiveDataClock.next(reactive);
                this.activeDataGraphic.next(active);
                this.reactiveDataGraphic.next(reactive);
              })
            )),
          tap(() => this.loading = false)
        ),
    ])
      .subscribe();
  }

  onActiveClockDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getData(this.contractId,'active', dates[0], dates[1])
      .pipe(
        tap((active) => this.activeDataClock.next(active)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }

  onReactiveClockDateChange(dates: Date[]) {
    this.loading = true;
    this.consumptionService.getData(this.contractId, 'reactive', dates[0], dates[1])
      .pipe(
        tap((reactive) => this.reactiveDataClock.next(reactive)),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }

  onGraphicDateChange(dates: Date[]) {
    this.loading = true;
    combineLatest([
      this.consumptionService.getData(this.contractId, 'active', dates[0], dates[1]),
      this.consumptionService.getData(this.contractId, 'reactive', dates[0], dates[1]),
    ])
      .pipe(
        tap(([active, reactive]) => {
          this.activeDataGraphic.next(active);
          this.reactiveDataGraphic.next(reactive);
        }),
        tap(() => this.loading = false),
        first()
      )
      .subscribe();
  }
}
