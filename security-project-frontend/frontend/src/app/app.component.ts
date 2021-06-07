import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from "./services/theme.service";
import {combineLatest, Subject} from "rxjs";
import {filter, switchMap, takeUntil} from "rxjs/operators";
import {UserService} from "./services/user.service";
import {ConsumptionService} from "./services/consumption.service";
import {DataSelectorService} from "./services/data-selector.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private themeService: ThemeService,
    private consumptionService: ConsumptionService,
    private dataSelectorService: DataSelectorService,
  ) {
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.themeService.changeTheme(savedTheme);
    }
    combineLatest([
      this.themeService.updateTheme$()
        .pipe(
          takeUntil(this.destroy$)
        ),
      this.dataSelectorService.getContract$()
        .pipe(
          filter((value) => !!value),
          switchMap((contractId) => this.consumptionService.retrieveDataDateRange(contractId))
        )
    ])
    .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
