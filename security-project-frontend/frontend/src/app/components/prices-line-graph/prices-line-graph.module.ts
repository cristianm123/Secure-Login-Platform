import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesLineGraphComponent } from "./prices-line-graph.component";
import { NgxEchartsModule } from "ngx-echarts";
import { NbCardModule, NbSelectModule, NbSpinnerModule } from "@nebular/theme";
import { DateRangeSelectorModule } from "../date-range-selector/date-range-selector.module";

@NgModule({
  declarations: [PricesLineGraphComponent],
  exports: [
    PricesLineGraphComponent
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
export class PricesLineGraphModule { }
