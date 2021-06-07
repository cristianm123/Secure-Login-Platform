import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from "ngx-echarts";
import { MeasureLineGraphModule } from "../../components/measure-line-graph/measure-line-graph.module";
import { NbCardModule, NbLayoutModule, NbSpinnerModule } from "@nebular/theme";
import { ComparativeMeasureLineGraphModule } from "../../components/comparative-measure-line-graph/comparative-measure-line-graph.module";
import { ClockValueGraphModule } from "../../components/clock-value-graph/clock-value-graph.module";
import { MeasureMatrixModule } from "../../components/measure-matrix/measure-matrix.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule,
    MeasureLineGraphModule,
    NbLayoutModule,
    NbSpinnerModule,
    ComparativeMeasureLineGraphModule,
    ClockValueGraphModule,
    MeasureMatrixModule,
    NbCardModule
  ]
})
export class DashboardModule { }
