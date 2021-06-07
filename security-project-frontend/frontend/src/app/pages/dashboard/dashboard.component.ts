import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { combineLatest } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  theme: string;
  loading: boolean;

  constructor(
    private themeService: ThemeService,
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
    ])
      .subscribe();
  }
}
