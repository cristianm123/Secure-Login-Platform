import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasureLineGraphComponent } from "./measure-line-graph.component";
import { NgxEchartsModule } from "ngx-echarts";
import { NbCardModule, NbSelectModule, NbSpinnerModule } from "@nebular/theme";
import { DateRangeSelectorModule } from "../date-range-selector/date-range-selector.module";

@NgModule({
  declarations: [MeasureLineGraphComponent],
  exports: [
    MeasureLineGraphComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NbCardModule,
    NbSpinnerModule,
    NbSelectModule,
    DateRangeSelectorModule
  ]
})
export class MeasureLineGraphModule { }
