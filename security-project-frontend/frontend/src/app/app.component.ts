import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from "./services/theme.service";
import {combineLatest, Subject} from "rxjs";
import {filter, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.themeService.changeTheme(savedTheme);
    }
    this.themeService.updateTheme$()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
