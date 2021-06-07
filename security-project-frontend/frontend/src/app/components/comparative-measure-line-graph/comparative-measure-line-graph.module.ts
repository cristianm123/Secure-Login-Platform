import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparativeMeasureLineGraphComponent } from './comparative-measure-line-graph.component';
import { NbCardModule, NbSpinnerModule } from "@nebular/theme";
import { NgxEchartsModule } from "ngx-echarts";
import { DateRangeSelectorModule } from "../date-range-selector/date-range-selector.module";

@NgModule({
  declarations: [ComparativeMeasureLineGraphComponent],
  exports: [
    ComparativeMeasureLineGraphComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NgxEchartsModule,
    NbSpinnerModule,
    DateRangeSelectorModule
  ]
})
export class ComparativeMeasureLineGraphModule { }
